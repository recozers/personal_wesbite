// Deep learning network structure
// Many narrow layers like a deep neural network (input -> hidden layers -> output)

const timelineData = {
    layers: [
        // Input layer - Origins
        {
            name: "L0",
            nodes: [
                {
                    id: "l0n0",
                    title: "Birth",
                    description: "Born in Oxford, Great Britain",
                    details: "I was born in Oxford, Great Britain. I lived there until I was 18, which laid the foundation for a life of movement and exploration.",
                    year: "2002",
                    category: "personal"
                }
            ]
        },
        // Early athletics
        {
            name: "L1",
            nodes: [
                {
                    id: "l1n0",
                    title: "Track & Field",
                    description: "Started competitive track and field",
                    details: "I began competitive track and field, eventually specializing in the decathlon - the ultimate test of athletic versatility. The decathlon consists of 10 events over 2 days: 100m, long jump, shot put, high jump, 400m, 110m hurdles, discus, pole vault, javelin, and 1500m.",
                    year: "2010s",
                    category: "athletics",
                    links: [
                        { label: "What is Decathlon?", url: "https://en.wikipedia.org/wiki/Decathlon" }
                    ]
                }
            ]
        },
        // First international
        {
            name: "L2",
            nodes: [
                {
                    id: "l2n0",
                    title: "England",
                    description: "First international representation for England",
                    details: "I was selected to represent England in international competition - a pivotal moment marking my transition from promising athlete to international competitor.",
                    year: "2017",
                    category: "athletics"
                }
            ]
        },
        // A-Levels
        {
            name: "L3",
            nodes: [
                {
                    id: "l3n0",
                    title: "A-Levels",
                    description: "Maths, Further Maths, Physics",
                    details: "I completed my A-Levels in Mathematics, Further Mathematics, and Physics. This rigorous academic foundation laid the groundwork for my future studies in economics, neuroscience, and AI.",
                    year: "2018-2020",
                    category: "education"
                },
                {
                    id: "l3n1",
                    title: "National Champ",
                    description: "GB National Champion in Decathlon",
                    details: "I won the Great Britain National Championship in Decathlon, becoming the top decathlete in the country for my age group. This achievement opened doors to US collegiate athletics.",
                    year: "2019",
                    category: "athletics"
                }
            ]
        },
        // University begins
        {
            name: "L4",
            nodes: [
                {
                    id: "l4n0",
                    title: "BU",
                    description: "Boston University - Economics & Neuroscience",
                    details: "I began my undergraduate studies at Boston University with a dual focus on Economics and Neuroscience. The combination of understanding human behavior through both economic and biological lenses would later prove foundational for building AI systems.",
                    year: "2020",
                    category: "education",
                    links: [
                        { label: "Boston University", url: "https://www.bu.edu" }
                    ]
                },
                {
                    id: "l4n1",
                    title: "BU Athletics",
                    description: "Competing in decathlon for Boston University",
                    details: "I joined Boston University's Division I track and field team as a decathlete, competing in the Patriot League. I balanced elite athletics with rigorous academics.",
                    year: "2020",
                    category: "athletics",
                    links: [
                        { label: "BU Athletics", url: "https://goterriers.com" }
                    ]
                }
            ]
        },
        // Comp neuro + training
        {
            name: "L5",
            nodes: [
                {
                    id: "l5n0",
                    title: "Comp Neuro",
                    description: "Started learning computational neuroscience",
                    details: "I dove deep into computational neuroscience - the intersection of neuroscience, mathematics, and computer science. I studied neural networks, brain modeling, and the computational principles underlying cognition.",
                    year: "2021",
                    category: "education"
                },
                {
                    id: "l5n1",
                    title: "Behav Econ",
                    description: "Specializing in behavioral economics",
                    details: "I specialized in behavioral economics, studying how psychological, cognitive, and emotional factors affect economic decisions. I was particularly influenced by Ray Fisman, my professor at BU, as well as the foundational work of Kahneman, Tversky, and Thaler on decision-making under uncertainty.",
                    year: "2021",
                    category: "education"
                },
                {
                    id: "l5n2",
                    title: "Surgery",
                    description: "Right hip and hamstring surgery",
                    details: "I underwent surgery on my right hip and hamstring - a significant setback requiring months of rehabilitation. This experience deepened my understanding of injury, recovery, and the importance of movement health.",
                    year: "2021",
                    category: "athletics"
                }
            ]
        },
        // Skills + training
        {
            name: "L6",
            nodes: [
                {
                    id: "l6n0",
                    title: "Python/ML",
                    description: "Learning Python and machine learning",
                    details: "I developed strong programming skills in Python and began studying machine learning in depth. I covered supervised/unsupervised learning, neural networks, and practical ML engineering.",
                    year: "2022",
                    category: "tech"
                },
                {
                    id: "l6n1",
                    title: "Training",
                    description: "High-level decathlon training",
                    details: "I returned to high-level training post-surgery. I worked on refining my technique across all 10 events while building strength and speed back to competitive levels.",
                    year: "2022",
                    category: "athletics"
                }
            ]
        },
        // Records + writing
        {
            name: "L7",
            nodes: [
                {
                    id: "l7n0",
                    title: "BU Record",
                    description: "Broke BU school record in decathlon",
                    details: "I set a new Boston University school record in the decathlon, surpassing a mark that had stood for years. It was the payoff of years of training and recovery from injury.",
                    year: "2023",
                    category: "athletics"
                },
                {
                    id: "l7n1",
                    title: "Substack",
                    description: "Launched newsletter on tech, sports, and life",
                    details: "I started writing publicly about the intersection of technology, athletics, and life. My newsletter explores ideas at the boundaries of AI, human performance, and personal development.",
                    year: "2023",
                    category: "writing",
                    links: [
                        { label: "Read the Newsletter", url: "https://stuartbladon.substack.com" }
                    ]
                },
                {
                    id: "l7n2",
                    title: "All-American",
                    description: "Academic All-American",
                    details: "I was named Academic All-American, recognizing excellence in both athletics and academics. This honor is given to student-athletes who maintain a high GPA while competing at the highest collegiate level.",
                    year: "2023",
                    category: "athletics"
                }
            ]
        },
        // Masters + founding + record
        {
            name: "L8",
            nodes: [
                {
                    id: "l8n0",
                    title: "Duke",
                    description: "Masters in AI at Duke University",
                    details: "I began my Master's degree in Artificial Intelligence at Duke University. I'm studying advanced ML, deep learning, NLP, computer vision, and AI systems design.",
                    year: "2024",
                    category: "education",
                    links: [
                        { label: "Duke AI Master's", url: "https://ai.meng.duke.edu" }
                    ]
                },
                {
                    id: "l8n1",
                    title: "Jeani",
                    description: "Founded Jeani - wearable movement health startup",
                    details: "I co-founded Jeani, a startup at the intersection of wearable technology and AI. We're building Thorpe, a 25 million parameter foundation model trained on human movement data to predict injury risk and optimize athletic performance.",
                    year: "2025",
                    category: "startup",
                    links: [
                        { label: "Jeani Health", url: "https://www.jeanihealth.com" }
                    ]
                },
                {
                    id: "l8n2",
                    title: "BU Record",
                    description: "Broke my own BU school record in decathlon",
                    details: "I broke my own BU school record in the decathlon, pushing the mark even higher. It demonstrated my continued improvement and ability to perform under pressure.",
                    year: "2024",
                    category: "athletics"
                },
                {
                    id: "l8n3",
                    title: "PL SAOY",
                    description: "Patriot League Scholar Athlete of the Year",
                    details: "I was named Patriot League Scholar Athlete of the Year - the highest individual honor in the conference recognizing combined excellence in athletics and academics.",
                    year: "2024",
                    category: "athletics"
                },
                {
                    id: "l8n4",
                    title: "All-American",
                    description: "Academic All-American",
                    details: "I was named Academic All-American for the second consecutive year, continuing my tradition of excellence in both athletic competition and academic achievement.",
                    year: "2024",
                    category: "athletics"
                }
            ]
        },
        // Current - Output layer
        {
            name: "L9",
            nodes: [
                {
                    id: "l9n0",
                    title: "Graduating",
                    description: "Completing Masters in AI at Duke",
                    details: "I'm completing my Master's in AI at Duke University. I'm also doing some interpretability research on the internal preferences of models.",
                    year: "2025",
                    category: "education"
                },
                {
                    id: "l9n1",
                    title: "Building",
                    description: "Scaling Jeani and the Thorpe model",
                    details: "I'm actively scaling Jeani and the Thorpe foundation model. I'm working on expanding the training dataset, improving model architecture, and building partnerships with sports teams and healthcare providers.",
                    year: "2025",
                    category: "startup",
                    links: [
                        { label: "Jeani Health", url: "https://www.jeanihealth.com" }
                    ]
                },
                {
                    id: "l9n2",
                    title: "GB Athlete",
                    description: "First GB representation - World University Games",
                    details: "I was selected to represent Great Britain at the World University Games - returning to international competition representing my country at a major multi-sport event.",
                    year: "2025",
                    category: "athletics",
                    links: [
                        { label: "World University Games", url: "https://www.fisu.net/fisu-games/summer" }
                    ]
                },
                {
                    id: "l9n3",
                    title: "All-American",
                    description: "Academic All-American",
                    details: "I was named Academic All-American for the third consecutive year, maintaining the highest standards of athletic and academic excellence throughout my collegiate career.",
                    year: "2025",
                    category: "athletics"
                },
                {
                    id: "l9n4",
                    title: "Surgery",
                    description: "Left hip and hamstring surgery",
                    details: "I underwent surgery on my left hip and hamstring - mirroring the right side surgery from 2021. Recovery and rehabilitation continue with the goal of returning to competition.",
                    year: "2025",
                    category: "athletics"
                },
                {
                    id: "l9n5",
                    title: "Mech Interp",
                    description: "Mapping the internal geopolitics of LLMs",
                    details: "I'm doing mechanistic interpretability research to understand how LLMs internally represent geopolitical concepts and biases. I built worldaccordingtoai.com to visualize these findings and am working on steering techniques for open source models to better understand and control model behavior.",
                    year: "2025",
                    category: "tech",
                    links: [
                        { label: "World According to AI", url: "https://worldaccordingtoai.com" }
                    ]
                }
            ]
        }
    ],

    // Fully connected layers - every node connects to every node in the next layer
    connections: [
        // L0 -> L1 (1x1 = 1)
        { from: "l0n0", to: "l1n0" },

        // L1 -> L2 (1x1 = 1)
        { from: "l1n0", to: "l2n0" },

        // L2 -> L3 (1x2 = 2)
        { from: "l2n0", to: "l3n0" },
        { from: "l2n0", to: "l3n1" },

        // L3 -> L4 (2x2 = 4)
        { from: "l3n0", to: "l4n0" },
        { from: "l3n0", to: "l4n1" },
        { from: "l3n1", to: "l4n0" },
        { from: "l3n1", to: "l4n1" },

        // L4 -> L5 (2x3 = 6)
        { from: "l4n0", to: "l5n0" },
        { from: "l4n0", to: "l5n1" },
        { from: "l4n0", to: "l5n2" },
        { from: "l4n1", to: "l5n0" },
        { from: "l4n1", to: "l5n1" },
        { from: "l4n1", to: "l5n2" },

        // L5 -> L6 (3x2 = 6)
        { from: "l5n0", to: "l6n0" },
        { from: "l5n0", to: "l6n1" },
        { from: "l5n1", to: "l6n0" },
        { from: "l5n1", to: "l6n1" },
        { from: "l5n2", to: "l6n0" },
        { from: "l5n2", to: "l6n1" },

        // L6 -> L7 (2x3 = 6)
        { from: "l6n0", to: "l7n0" },
        { from: "l6n0", to: "l7n1" },
        { from: "l6n0", to: "l7n2" },
        { from: "l6n1", to: "l7n0" },
        { from: "l6n1", to: "l7n1" },
        { from: "l6n1", to: "l7n2" },

        // L7 -> L8 (3x5 = 15)
        { from: "l7n0", to: "l8n0" },
        { from: "l7n0", to: "l8n1" },
        { from: "l7n0", to: "l8n2" },
        { from: "l7n0", to: "l8n3" },
        { from: "l7n0", to: "l8n4" },
        { from: "l7n1", to: "l8n0" },
        { from: "l7n1", to: "l8n1" },
        { from: "l7n1", to: "l8n2" },
        { from: "l7n1", to: "l8n3" },
        { from: "l7n1", to: "l8n4" },
        { from: "l7n2", to: "l8n0" },
        { from: "l7n2", to: "l8n1" },
        { from: "l7n2", to: "l8n2" },
        { from: "l7n2", to: "l8n3" },
        { from: "l7n2", to: "l8n4" },

        // L8 -> L9 (5x5 = 25)
        { from: "l8n0", to: "l9n0" },
        { from: "l8n0", to: "l9n1" },
        { from: "l8n0", to: "l9n2" },
        { from: "l8n0", to: "l9n3" },
        { from: "l8n0", to: "l9n4" },
        { from: "l8n1", to: "l9n0" },
        { from: "l8n1", to: "l9n1" },
        { from: "l8n1", to: "l9n2" },
        { from: "l8n1", to: "l9n3" },
        { from: "l8n1", to: "l9n4" },
        { from: "l8n2", to: "l9n0" },
        { from: "l8n2", to: "l9n1" },
        { from: "l8n2", to: "l9n2" },
        { from: "l8n2", to: "l9n3" },
        { from: "l8n2", to: "l9n4" },
        { from: "l8n3", to: "l9n0" },
        { from: "l8n3", to: "l9n1" },
        { from: "l8n3", to: "l9n2" },
        { from: "l8n3", to: "l9n3" },
        { from: "l8n3", to: "l9n4" },
        { from: "l8n4", to: "l9n0" },
        { from: "l8n4", to: "l9n1" },
        { from: "l8n4", to: "l9n2" },
        { from: "l8n4", to: "l9n3" },
        { from: "l8n4", to: "l9n4" },
        { from: "l8n0", to: "l9n5" },
        { from: "l8n1", to: "l9n5" },
        { from: "l8n2", to: "l9n5" },
        { from: "l8n3", to: "l9n5" },
        { from: "l8n4", to: "l9n5" }
    ]
};
