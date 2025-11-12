// Deep learning network structure
// Many narrow layers like a deep neural network (input -> hidden layers -> output)

const timelineData = {
    layers: [
        // Input layer
        {
            name: "L0",
            nodes: [
                { id: "l0n0", title: "Birth", description: "Born and raised", year: "1990" },
                { id: "l0n1", title: "Family", description: "Early family influence", year: "1990s" }
            ]
        },
        // Hidden layers
        {
            name: "L1",
            nodes: [
                { id: "l1n0", title: "Primary", description: "Primary school", year: "1995" },
                { id: "l1n1", title: "Sports", description: "Started playing sports", year: "1997" }
            ]
        },
        {
            name: "L2",
            nodes: [
                { id: "l2n0", title: "Secondary", description: "Secondary school", year: "2000" },
                { id: "l2n1", title: "First Code", description: "Wrote first program", year: "2002" },
                { id: "l2n2", title: "Music", description: "Learned instrument", year: "2003" }
            ]
        },
        {
            name: "L3",
            nodes: [
                { id: "l3n0", title: "A-Levels", description: "Math & Physics", year: "2006" },
                { id: "l3n1", title: "Project", description: "First big project", year: "2007" }
            ]
        },
        {
            name: "L4",
            nodes: [
                { id: "l4n0", title: "University", description: "Computer Science", year: "2008" },
                { id: "l4n1", title: "Hackathon", description: "First hackathon", year: "2009" },
                { id: "l4n2", title: "Club", description: "Founded tech club", year: "2010" }
            ]
        },
        {
            name: "L5",
            nodes: [
                { id: "l5n0", title: "Internship", description: "Tech company intern", year: "2010" },
                { id: "l5n1", title: "Research", description: "ML research project", year: "2011" }
            ]
        },
        {
            name: "L6",
            nodes: [
                { id: "l6n0", title: "Thesis", description: "Final year project", year: "2011" },
                { id: "l6n1", title: "Graduate", description: "BSc Computer Science", year: "2012" }
            ]
        },
        {
            name: "L7",
            nodes: [
                { id: "l7n0", title: "First Job", description: "Software Engineer", year: "2012" },
                { id: "l7n1", title: "OSS", description: "Open source contrib", year: "2013" },
                { id: "l7n2", title: "Side Proj", description: "Side projects", year: "2014" }
            ]
        },
        {
            name: "L8",
            nodes: [
                { id: "l8n0", title: "Senior", description: "Senior Engineer", year: "2015" },
                { id: "l8n1", title: "Talks", description: "Conference talks", year: "2016" }
            ]
        },
        {
            name: "L9",
            nodes: [
                { id: "l9n0", title: "Lead", description: "Tech Lead", year: "2018" },
                { id: "l9n1", title: "Mentor", description: "Mentoring others", year: "2019" }
            ]
        },
        // Output layer
        {
            name: "L10",
            nodes: [
                { id: "l10n0", title: "Current", description: "Current position", year: "2020-Now" }
            ]
        }
    ],

    // Fully connected between adjacent layers (like a real neural network)
    connections: [
        // L0 -> L1
        { from: "l0n0", to: "l1n0" },
        { from: "l0n0", to: "l1n1" },
        { from: "l0n1", to: "l1n0" },
        { from: "l0n1", to: "l1n1" },

        // L1 -> L2
        { from: "l1n0", to: "l2n0" },
        { from: "l1n0", to: "l2n1" },
        { from: "l1n0", to: "l2n2" },
        { from: "l1n1", to: "l2n0" },
        { from: "l1n1", to: "l2n1" },
        { from: "l1n1", to: "l2n2" },

        // L2 -> L3
        { from: "l2n0", to: "l3n0" },
        { from: "l2n0", to: "l3n1" },
        { from: "l2n1", to: "l3n0" },
        { from: "l2n1", to: "l3n1" },
        { from: "l2n2", to: "l3n0" },
        { from: "l2n2", to: "l3n1" },

        // L3 -> L4
        { from: "l3n0", to: "l4n0" },
        { from: "l3n0", to: "l4n1" },
        { from: "l3n0", to: "l4n2" },
        { from: "l3n1", to: "l4n0" },
        { from: "l3n1", to: "l4n1" },
        { from: "l3n1", to: "l4n2" },

        // L4 -> L5
        { from: "l4n0", to: "l5n0" },
        { from: "l4n0", to: "l5n1" },
        { from: "l4n1", to: "l5n0" },
        { from: "l4n1", to: "l5n1" },
        { from: "l4n2", to: "l5n0" },
        { from: "l4n2", to: "l5n1" },

        // L5 -> L6
        { from: "l5n0", to: "l6n0" },
        { from: "l5n0", to: "l6n1" },
        { from: "l5n1", to: "l6n0" },
        { from: "l5n1", to: "l6n1" },

        // L6 -> L7
        { from: "l6n0", to: "l7n0" },
        { from: "l6n0", to: "l7n1" },
        { from: "l6n0", to: "l7n2" },
        { from: "l6n1", to: "l7n0" },
        { from: "l6n1", to: "l7n1" },
        { from: "l6n1", to: "l7n2" },

        // L7 -> L8
        { from: "l7n0", to: "l8n0" },
        { from: "l7n0", to: "l8n1" },
        { from: "l7n1", to: "l8n0" },
        { from: "l7n1", to: "l8n1" },
        { from: "l7n2", to: "l8n0" },
        { from: "l7n2", to: "l8n1" },

        // L8 -> L9
        { from: "l8n0", to: "l9n0" },
        { from: "l8n0", to: "l9n1" },
        { from: "l8n1", to: "l9n0" },
        { from: "l8n1", to: "l9n1" },

        // L9 -> L10
        { from: "l9n0", to: "l10n0" },
        { from: "l9n1", to: "l10n0" }
    ]
};
