// Neural Network Visualization
class NeuralNetworkViz {
    constructor(canvasId, data) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.data = data;
        this.nodes = [];
        this.tooltip = document.getElementById('tooltip');
        this.hoveredNode = null;
        this.animationProgress = 0;

        this.init();
    }

    init() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('click', (e) => this.handleClick(e));
        this.calculateNodePositions();
        this.animate();
    }

    resizeCanvas() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width * window.devicePixelRatio;
        this.canvas.height = rect.height * window.devicePixelRatio;
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        this.width = rect.width;
        this.height = rect.height;
        this.calculateNodePositions();
    }

    calculateNodePositions() {
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
                    radius: 15,
                    layerIndex: layerIndex
                });
            });
        });
    }

    drawConnections() {
        this.data.connections.forEach(connection => {
            const fromNode = this.nodes.find(n => n.id === connection.from);
            const toNode = this.nodes.find(n => n.id === connection.to);

            if (fromNode && toNode) {
                // Draw simple straight lines for minimalist look
                this.ctx.save();
                this.ctx.beginPath();
                this.ctx.moveTo(fromNode.x, fromNode.y);
                this.ctx.lineTo(toNode.x, toNode.y);

                // Highlight if hovering over connected nodes
                if (this.hoveredNode &&
                    (this.hoveredNode.id === fromNode.id || this.hoveredNode.id === toNode.id)) {
                    this.ctx.strokeStyle = 'rgba(150, 150, 150, 0.8)';
                    this.ctx.lineWidth = 1.5;
                } else {
                    this.ctx.strokeStyle = 'rgba(100, 100, 100, 0.4)';
                    this.ctx.lineWidth = 0.8;
                }

                this.ctx.stroke();
                this.ctx.restore();
            }
        });
    }

    drawNodes() {
        this.nodes.forEach(node => {
            const isHovered = this.hoveredNode && this.hoveredNode.id === node.id;
            const radius = node.radius;

            // Draw simple circle nodes
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);

            // Minimalist fill
            this.ctx.fillStyle = isHovered ? '#fff' : '#222';
            this.ctx.fill();

            // Clean border
            this.ctx.strokeStyle = isHovered ? '#888' : '#444';
            this.ctx.lineWidth = isHovered ? 2 : 1;
            this.ctx.stroke();
            this.ctx.restore();
        });
    }

    drawLayerLabels() {
        const layers = this.data.layers;
        const padding = 60;
        const layerWidth = (this.width - padding * 2) / (layers.length - 1);

        layers.forEach((layer, index) => {
            const x = padding + layerWidth * index;
            this.ctx.save();
            this.ctx.fillStyle = '#555';
            this.ctx.font = '10px monospace';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(layer.name, x, 15);
            this.ctx.restore();
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        this.drawConnections();
        this.drawNodes();
        this.drawLayerLabels();

        requestAnimationFrame(() => this.animate());
    }

    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        let foundNode = null;

        for (let node of this.nodes) {
            const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2);
            if (distance < node.radius) {
                foundNode = node;
                break;
            }
        }

        if (foundNode) {
            this.hoveredNode = foundNode;
            this.showTooltip(foundNode, e.clientX, e.clientY);
            this.canvas.style.cursor = 'pointer';
        } else {
            this.hoveredNode = null;
            this.hideTooltip();
            this.canvas.style.cursor = 'default';
        }
    }

    handleClick(e) {
        if (this.hoveredNode) {
            alert(`${this.hoveredNode.title}\n\n${this.hoveredNode.description}\n\nYear: ${this.hoveredNode.year}`);
        }
    }

    showTooltip(node, x, y) {
        this.tooltip.innerHTML = `
            <strong>${node.title}</strong>
            ${node.year}<br>
            ${node.description}
        `;
        this.tooltip.style.left = (x + 15) + 'px';
        this.tooltip.style.top = (y + 15) + 'px';
        this.tooltip.classList.add('show');
    }

    hideTooltip() {
        this.tooltip.classList.remove('show');
    }

}

// Initialize the visualization when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new NeuralNetworkViz('neuralNetwork', timelineData);
});
