// Neural Network Visualization — ink on paper
const INK = {
    edge: 'rgba(20, 20, 18, 0.16)',
    edgeFocus: 'rgba(20, 20, 18, 0.55)',
    edgeDim: 'rgba(20, 20, 18, 0.05)',
    nodeFill: '#ffffff',
    nodeStroke: '#141412',
    nodeStrokeDim: '#cfcfc8',
    label: '#45453f',
    labelHover: '#141412',
    labelDim: 'rgba(69, 69, 63, 0.28)',
    layerLabel: '#b3b3ab',
    halo: 'rgba(255, 255, 255, 0.9)'
};

const ENTRY = {
    layerDelay: 110,   // ms between layers appearing
    nodeDur: 500,      // node fade/scale duration
    edgeLag: 140,      // edges start after their source layer
    edgeDur: 480       // edge draw-on duration
};

class NeuralNetworkViz {
    constructor(canvasId, data) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.data = data;
        this.nodes = [];
        this.edges = [];
        this.tooltip = document.getElementById('tooltip');
        this.hoveredNode = null;
        this.neighborIds = new Set();
        this.startTime = performance.now();
        this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Modal elements
        this.modal = document.getElementById('modal');
        this.modalClose = document.getElementById('modalClose');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalCategory = document.getElementById('modalCategory');
        this.modalYear = document.getElementById('modalYear');
        this.modalDetails = document.getElementById('modalDetails');
        this.modalLinks = document.getElementById('modalLinks');
        this.connectionFrom = document.getElementById('connectionFrom');
        this.connectionTo = document.getElementById('connectionTo');
        this.fromNodes = document.getElementById('fromNodes');
        this.toNodes = document.getElementById('toNodes');

        this.init();
    }

    init() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        // Mouse events for desktop
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseleave', () => this.setHovered(null));
        this.canvas.addEventListener('click', (e) => this.handleClick(e));

        // Touch events for mobile - allow scrolling, only prevent default on actual taps
        this.canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
        this.canvas.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: true });
        this.canvas.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: false });

        this.setupModal();
        this.animate();
    }

    setupModal() {
        // Close modal on X button click
        this.modalClose.addEventListener('click', () => this.closeModal());

        // Close modal on backdrop click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('show')) {
                this.closeModal();
            }
        });
    }

    resizeCanvas() {
        const rect = this.canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        this.width = rect.width;
        this.height = rect.height;
        this.calculateNodePositions();
    }

    calculateNodePositions() {
        const prevHover = new Map(this.nodes.map(n => [n.id, n.hoverAnim]));
        this.nodes = [];
        const layers = this.data.layers;
        const padding = 60;
        const layerWidth = (this.width - padding * 2) / (layers.length - 1);

        layers.forEach((layer, layerIndex) => {
            const x = padding + layerWidth * layerIndex;
            const nodeCount = layer.nodes.length;
            const maxNodes = Math.max(...layers.map(l => l.nodes.length));
            const verticalSpacing = this.height / (maxNodes + 1);

            layer.nodes.forEach((nodeData, nodeIndex) => {
                const yOffset = (maxNodes - nodeCount) * verticalSpacing / 2;
                const y = yOffset + verticalSpacing * (nodeIndex + 1);
                this.nodes.push({
                    ...nodeData,
                    x: x,
                    y: y,
                    radius: 13,
                    hoverAnim: prevHover.get(nodeData.id) || 0,
                    layerIndex: layerIndex
                });
            });
        });

        this.nodeById = new Map(this.nodes.map(n => [n.id, n]));
        this.buildEdges();
    }

    buildEdges() {
        this.edges = [];
        this.data.connections.forEach(connection => {
            const from = this.nodeById.get(connection.from);
            const to = this.nodeById.get(connection.to);
            if (!from || !to) return;

            const bend = (to.x - from.x) * 0.45;
            const edge = {
                from, to,
                cx1: from.x + bend, cy1: from.y,
                cx2: to.x - bend, cy2: to.y,
                len: 0
            };
            // Approximate curve length by sampling
            let prev = { x: from.x, y: from.y };
            for (let i = 1; i <= 16; i++) {
                const p = this.pointOnEdge(edge, i / 16);
                edge.len += Math.hypot(p.x - prev.x, p.y - prev.y);
                prev = p;
            }
            this.edges.push(edge);
        });
    }

    pointOnEdge(edge, t) {
        const u = 1 - t;
        const a = u * u * u, b = 3 * u * u * t, c = 3 * u * t * t, d = t * t * t;
        return {
            x: a * edge.from.x + b * edge.cx1 + c * edge.cx2 + d * edge.to.x,
            y: a * edge.from.y + b * edge.cy1 + c * edge.cy2 + d * edge.to.y
        };
    }

    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    entryProgress(elapsed, delay, duration) {
        if (this.reducedMotion) return 1;
        return this.easeOutCubic(Math.min(1, Math.max(0, (elapsed - delay) / duration)));
    }

    isFocused(node) {
        return !this.hoveredNode || this.neighborIds.has(node.id);
    }

    edgeState(edge) {
        if (!this.hoveredNode) return 'normal';
        return (edge.from.id === this.hoveredNode.id || edge.to.id === this.hoveredNode.id)
            ? 'focus' : 'dim';
    }

    drawConnections(elapsed) {
        const ctx = this.ctx;
        this.edges.forEach(edge => {
            const prog = this.entryProgress(
                elapsed,
                edge.from.layerIndex * ENTRY.layerDelay + ENTRY.edgeLag,
                ENTRY.edgeDur
            );
            if (prog <= 0) return;

            const state = this.edgeState(edge);
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(edge.from.x, edge.from.y);
            ctx.bezierCurveTo(edge.cx1, edge.cy1, edge.cx2, edge.cy2, edge.to.x, edge.to.y);
            if (prog < 1) {
                ctx.setLineDash([edge.len * prog, edge.len]);
            }
            if (state === 'focus') {
                ctx.strokeStyle = INK.edgeFocus;
                ctx.lineWidth = 1.3;
            } else if (state === 'dim') {
                ctx.strokeStyle = INK.edgeDim;
                ctx.lineWidth = 1;
            } else {
                ctx.strokeStyle = INK.edge;
                ctx.lineWidth = 1;
            }
            ctx.stroke();
            ctx.restore();
        });
    }

    drawNodes(elapsed) {
        const ctx = this.ctx;
        this.nodes.forEach(node => {
            const isHovered = this.hoveredNode && this.hoveredNode.id === node.id;
            const prog = this.entryProgress(
                elapsed, node.layerIndex * ENTRY.layerDelay, ENTRY.nodeDur
            );
            if (prog <= 0) return;

            // Smooth hover growth
            node.hoverAnim += ((isHovered ? 1 : 0) - node.hoverAnim) * 0.18;
            const radius = node.radius * prog + node.hoverAnim * 2.5;
            const focused = this.isFocused(node);

            ctx.save();
            ctx.globalAlpha = prog;

            // Soft paper shadow
            ctx.shadowColor = 'rgba(20, 20, 18, 0.10)';
            ctx.shadowBlur = 6;
            ctx.shadowOffsetY = 2;

            ctx.beginPath();
            ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
            ctx.fillStyle = node.hoverAnim > 0.02
                ? this.mixInk(node.hoverAnim)
                : INK.nodeFill;
            ctx.fill();

            ctx.shadowColor = 'transparent';
            ctx.strokeStyle = focused ? INK.nodeStroke : INK.nodeStrokeDim;
            ctx.lineWidth = isHovered ? 1.6 : 1.25;
            ctx.stroke();
            ctx.restore();

            this.drawNodeLabel(node, prog, focused, isHovered);
        });
    }

    mixInk(t) {
        // White -> ink fill as hover animates
        const v = Math.round(255 - (255 - 20) * t);
        return `rgb(${v}, ${v}, ${Math.max(v - 2, 18)})`;
    }

    drawNodeLabel(node, prog, focused, isHovered) {
        const ctx = this.ctx;
        ctx.save();
        ctx.font = (isHovered ? '500 ' : '400 ') + '10px "IBM Plex Mono", ui-monospace, monospace';
        ctx.textAlign = 'center';

        // Alternate label side per layer so same-row labels in
        // neighbouring columns never collide
        const above = node.layerIndex % 2 === 1;
        ctx.textBaseline = above ? 'bottom' : 'top';

        // Keep labels inside the canvas
        const halfWidth = ctx.measureText(node.title).width / 2;
        const x = Math.min(Math.max(node.x, halfWidth + 4), this.width - halfWidth - 4);
        const y = above ? node.y - node.radius - 9 : node.y + node.radius + 9;

        ctx.globalAlpha = prog;
        ctx.lineWidth = 3;
        ctx.strokeStyle = INK.halo;
        ctx.lineJoin = 'round';
        ctx.strokeText(node.title, x, y);
        ctx.fillStyle = isHovered ? INK.labelHover : (focused ? INK.label : INK.labelDim);
        ctx.fillText(node.title, x, y);
        ctx.restore();
    }

    drawLayerLabels(elapsed) {
        const ctx = this.ctx;
        const layers = this.data.layers;
        const padding = 60;
        const layerWidth = (this.width - padding * 2) / (layers.length - 1);

        layers.forEach((layer, index) => {
            const prog = this.entryProgress(elapsed, index * ENTRY.layerDelay, ENTRY.nodeDur);
            if (prog <= 0) return;
            const x = padding + layerWidth * index;
            ctx.save();
            ctx.globalAlpha = prog;
            ctx.fillStyle = INK.layerLabel;
            ctx.font = '400 9px "IBM Plex Mono", ui-monospace, monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(layer.name, x, 12);
            ctx.restore();
        });
    }

    animate() {
        const now = performance.now();
        const elapsed = now - this.startTime;

        this.ctx.clearRect(0, 0, this.width, this.height);
        this.drawConnections(elapsed);
        this.drawNodes(elapsed);
        this.drawLayerLabels(elapsed);

        requestAnimationFrame(() => this.animate());
    }

    setHovered(node) {
        this.hoveredNode = node;
        this.neighborIds = new Set();
        if (node) {
            this.neighborIds.add(node.id);
            this.data.connections.forEach(c => {
                if (c.from === node.id) this.neighborIds.add(c.to);
                if (c.to === node.id) this.neighborIds.add(c.from);
            });
        }
    }

    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        let foundNode = null;

        for (let node of this.nodes) {
            const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2);
            if (distance < node.radius + 4) {
                foundNode = node;
                break;
            }
        }

        if (foundNode) {
            if (!this.hoveredNode || this.hoveredNode.id !== foundNode.id) {
                this.setHovered(foundNode);
            }
            this.showTooltip(foundNode, e.clientX, e.clientY);
            this.canvas.style.cursor = 'pointer';
        } else {
            this.setHovered(null);
            this.hideTooltip();
            this.canvas.style.cursor = 'default';
        }
    }

    handleClick(e) {
        if (this.hoveredNode) {
            this.openNode(this.hoveredNode);
        }
    }

    openNode(node) {
        const target = node.url || node.pdf;
        if (target) {
            window.open(target, '_blank', 'noopener,noreferrer');
            return;
        }
        this.showModal(node);
    }

    handleTouchStart(e) {
        const touch = e.touches[0];
        this.touchStartX = touch.clientX;
        this.touchStartY = touch.clientY;
        this.touchMoved = false;

        const node = this.getNodeAtPosition(touch.clientX, touch.clientY);
        if (node) {
            this.setHovered(node);
            this.touchStartNode = node;
        } else {
            this.setHovered(null);
            this.touchStartNode = null;
        }
    }

    handleTouchMove(e) {
        const touch = e.touches[0];
        const deltaX = Math.abs(touch.clientX - this.touchStartX);
        const deltaY = Math.abs(touch.clientY - this.touchStartY);

        // If moved more than 10px, consider it a scroll
        if (deltaX > 10 || deltaY > 10) {
            this.touchMoved = true;
            this.touchStartNode = null;
            this.setHovered(null);
        }
    }

    handleTouchEnd(e) {
        // Only open if we didn't scroll and started on a node
        if (!this.touchMoved && this.touchStartNode) {
            e.preventDefault();
            this.openNode(this.touchStartNode);
        }
        this.setHovered(null);
        this.touchStartNode = null;
        this.touchMoved = false;
    }

    getNodeAtPosition(clientX, clientY) {
        const rect = this.canvas.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        // Use larger touch radius for mobile (easier to tap)
        const touchRadius = window.innerWidth <= 768 ? 25 : 17;

        for (let node of this.nodes) {
            const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2);
            if (distance < touchRadius) {
                return node;
            }
        }
        return null;
    }

    showModal(node) {
        // Hide tooltip when modal opens
        this.hideTooltip();

        // Set basic info
        this.modalTitle.textContent = node.title;
        this.modalYear.textContent = node.year;
        this.modalDetails.textContent = node.details || node.description;

        // Set category with styling
        const category = node.category || 'personal';
        this.modalCategory.textContent = category;
        this.modalCategory.className = 'modal-category ' + category;

        // Build links section
        this.modalLinks.innerHTML = '';
        if (node.links && node.links.length > 0) {
            node.links.forEach(link => {
                const a = document.createElement('a');
                a.href = link.url;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                a.textContent = link.label;
                this.modalLinks.appendChild(a);
            });
        }

        // Find connected nodes
        const fromConnections = this.data.connections
            .filter(c => c.to === node.id)
            .map(c => this.nodes.find(n => n.id === c.from))
            .filter(n => n);

        const toConnections = this.data.connections
            .filter(c => c.from === node.id)
            .map(c => this.nodes.find(n => n.id === c.to))
            .filter(n => n);

        // Build "from" connections
        this.fromNodes.innerHTML = '';
        if (fromConnections.length > 0) {
            this.connectionFrom.classList.remove('hidden');
            fromConnections.forEach(connNode => {
                const btn = document.createElement('button');
                btn.className = 'connection-node';
                btn.textContent = connNode.title;
                btn.addEventListener('click', () => this.openNode(connNode));
                this.fromNodes.appendChild(btn);
            });
        } else {
            this.connectionFrom.classList.add('hidden');
        }

        // Build "to" connections
        this.toNodes.innerHTML = '';
        if (toConnections.length > 0) {
            this.connectionTo.classList.remove('hidden');
            toConnections.forEach(connNode => {
                const btn = document.createElement('button');
                btn.className = 'connection-node';
                btn.textContent = connNode.title;
                btn.addEventListener('click', () => this.openNode(connNode));
                this.toNodes.appendChild(btn);
            });
        } else {
            this.connectionTo.classList.add('hidden');
        }

        // Show modal
        this.modal.classList.add('show');
    }

    closeModal() {
        this.modal.classList.remove('show');
    }

    showTooltip(node, x, y) {
        this.tooltip.innerHTML = `
            <strong>${node.title}</strong>
            <span class="tooltip-year">${node.year}</span>
            ${node.description}
        `;
        this.tooltip.classList.add('show');

        // Keep the tooltip on screen
        const pad = 16;
        const w = this.tooltip.offsetWidth;
        const h = this.tooltip.offsetHeight;
        let left = x + pad;
        let top = y + pad;
        if (left + w > window.innerWidth - 8) left = x - w - pad;
        if (top + h > window.innerHeight - 8) top = y - h - pad;
        this.tooltip.style.left = left + 'px';
        this.tooltip.style.top = top + 'px';
    }

    hideTooltip() {
        this.tooltip.classList.remove('show');
    }

}

// Initialize the visualization when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new NeuralNetworkViz('neuralNetwork', timelineData);
});
