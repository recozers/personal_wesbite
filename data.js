// Deep learning network structure
// Many narrow layers like a deep neural network (input -> hidden layers -> output)

const timelineData = {
    layers: [
        // Input layer - Origins
        {
            name: "L0",
            nodes: [
                { id: "l0n0", title: "Birth", description: "Born in the UK", year: "2002" }
            ]
        },
        // Early athletics
        {
            name: "L1",
            nodes: [
                { id: "l1n0", title: "Decathlon", description: "Started competitive decathlon", year: "2010s" }
            ]
        },
        // First international
        {
            name: "L2",
            nodes: [
                { id: "l2n0", title: "England", description: "First international representation for England", year: "2017" }
            ]
        },
        // A-Levels
        {
            name: "L3",
            nodes: [
                { id: "l3n0", title: "A-Levels", description: "Maths, Further Maths, Physics", year: "2018-2020" },
                { id: "l3n1", title: "National Champ", description: "GB National Champion in Decathlon", year: "2019" }
            ]
        },
        // University begins
        {
            name: "L4",
            nodes: [
                { id: "l4n0", title: "BU", description: "Boston University - Economics & Neuroscience", year: "2020" },
                { id: "l4n1", title: "BU Athletics", description: "Competing in decathlon for Boston University", year: "2020" }
            ]
        },
        // Comp neuro + training
        {
            name: "L5",
            nodes: [
                { id: "l5n0", title: "Comp Neuro", description: "Started learning computational neuroscience", year: "2021" },
                { id: "l5n1", title: "Behav Econ", description: "Specialising in behavioural economics", year: "2021" },
                { id: "l5n2", title: "Surgery", description: "Right hip and hamstring surgery", year: "2021" }
            ]
        },
        // Skills + training
        {
            name: "L6",
            nodes: [
                { id: "l6n0", title: "Python/ML", description: "Learning Python and machine learning", year: "2022" },
                { id: "l6n1", title: "Training", description: "High-level decathlon training", year: "2022" }
            ]
        },
        // Records + writing
        {
            name: "L7",
            nodes: [
                { id: "l7n0", title: "BU Record", description: "Broke BU school record in decathlon", year: "2023" },
                { id: "l7n1", title: "Substack", description: "Launched newsletter on tech, sports, and life", year: "2023", link: "https://stuartbladon.substack.com" },
                { id: "l7n2", title: "All-American", description: "Academic All-American", year: "2023" }
            ]
        },
        // Masters + founding + record
        {
            name: "L8",
            nodes: [
                { id: "l8n0", title: "Duke", description: "Masters in AI at Duke University", year: "2024" },
                { id: "l8n1", title: "Jeani", description: "Founded Jeani - wearable movement health startup building Thorpe, a 25M parameter foundation model for human movement", year: "2024", link: "https://www.jeanihealth.com" },
                { id: "l8n2", title: "BU Record", description: "Broke own BU school record in decathlon", year: "2024" },
                { id: "l8n3", title: "PL SAOY", description: "Patriot League Scholar Athlete of the Year", year: "2024" },
                { id: "l8n4", title: "All-American", description: "Academic All-American", year: "2024" }
            ]
        },
        // Current - Output layer
        {
            name: "L9",
            nodes: [
                { id: "l9n0", title: "Graduating", description: "Completing Masters in AI at Duke", year: "2025" },
                { id: "l9n1", title: "Building", description: "Scaling Jeani and the Thorpe model", year: "2025" },
                { id: "l9n2", title: "GB Athlete", description: "First GB representation - World University Games", year: "2025" },
                { id: "l9n3", title: "All-American", description: "Academic All-American", year: "2025" },
                { id: "l9n4", title: "Surgery", description: "Left hip and hamstring surgery", year: "2025" }
            ]
        }
    ],

    // Connections between adjacent layers
    connections: [
        // L0 -> L1
        { from: "l0n0", to: "l1n0" },

        // L1 -> L2
        { from: "l1n0", to: "l2n0" },

        // L2 -> L3
        { from: "l2n0", to: "l3n0" },
        { from: "l2n0", to: "l3n1" },

        // L3 -> L4
        { from: "l3n0", to: "l4n0" },
        { from: "l3n0", to: "l4n1" },
        { from: "l3n1", to: "l4n1" },

        // L4 -> L5
        { from: "l4n0", to: "l5n0" },
        { from: "l4n0", to: "l5n1" },
        { from: "l4n1", to: "l5n0" },
        { from: "l4n1", to: "l5n2" },

        // L5 -> L6
        { from: "l5n0", to: "l6n0" },
        { from: "l5n1", to: "l6n0" },
        { from: "l5n0", to: "l6n1" },
        { from: "l5n2", to: "l6n1" },

        // L6 -> L7
        { from: "l6n0", to: "l7n1" },
        { from: "l6n0", to: "l7n2" },
        { from: "l6n1", to: "l7n0" },
        { from: "l6n1", to: "l7n2" },

        // L7 -> L8
        { from: "l7n0", to: "l8n2" },
        { from: "l7n0", to: "l8n3" },
        { from: "l7n1", to: "l8n0" },
        { from: "l7n1", to: "l8n1" },
        { from: "l7n2", to: "l8n3" },
        { from: "l7n2", to: "l8n4" },

        // L8 -> L9
        { from: "l8n0", to: "l9n0" },
        { from: "l8n0", to: "l9n1" },
        { from: "l8n1", to: "l9n1" },
        { from: "l8n2", to: "l9n2" },
        { from: "l8n2", to: "l9n4" },
        { from: "l8n3", to: "l9n2" },
        { from: "l8n4", to: "l9n3" }
    ]
};
