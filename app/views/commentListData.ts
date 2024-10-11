export interface IComment {
    id?: string;
    username: string;
    text: string;
    replies?: IComment[];
}

export const MOCK_COMMENTS: IComment[] = [
    {
        id: "1",
        username: "alex_travel",
        text: "Just got back from my trip to Iceland! The landscapes were unreal.",
        replies: [
            {
                id: "1-1",
                username: "wanderlust99",
                text: "That sounds amazing! Did you see the northern lights?",
                replies: [
                    {
                        id: "1-1-1",
                        username: "alex_travel",
                        text: "Yes, and it was absolutely breathtaking!",
                        replies: []
                    }
                ]
            },
            {
                id: "1-2",
                username: "photo_fanatic",
                text: "Do you have any photos to share? Would love to see them!",
                replies: []
            }
        ]
    },
    {
        id: "2",
        username: "tech_guru",
        text: "The latest iPhone update has some cool new features, but it’s still draining my battery faster than expected.",
        replies: [
            {
                id: "2-1",
                username: "apple_fan",
                text: "I agree! I noticed that too, but turning off background app refresh helped a bit.",
                replies: []
            }
        ]
    },
    {
        id: "3",
        username: "fitness_freak",
        text: "Finished my first marathon today! Feeling exhausted but proud.",
        replies: [
            {
                id: "3-1",
                username: "runnergirl_89",
                text: "Congratulations! How was the experience overall?",
                replies: [
                    {
                        id: "3-1-1",
                        username: "fitness_freak",
                        text: "It was tough but totally worth it! The crowd's energy kept me going.",
                        replies: []
                    }
                ]
            }
        ]
    },
    {
        id: "4",
        username: "chef_marie",
        text: "Just made a homemade lasagna from scratch, and it turned out delicious!",
        replies: [
            {
                id: "4-1",
                username: "foodlover",
                text: "That sounds so good! What's your secret ingredient?",
                replies: [
                    {
                        id: "4-1-1",
                        username: "chef_marie",
                        text: "A touch of nutmeg in the béchamel sauce. It adds a nice depth of flavor.",
                        replies: []
                    }
                ]
            }
        ]
    },
    {
        id: "5",
        username: "movie_buff",
        text: "Just watched the new sci-fi movie everyone’s been talking about. The plot twist at the end was mind-blowing!",
        replies: [
            {
                id: "5-1",
                username: "cinema_fan",
                text: "No spoilers! Is it worth watching?",
                replies: [
                    {
                        id: "5-1-1",
                        username: "movie_buff",
                        text: "Definitely! The storyline is a bit slow at first, but it pays off big time.",
                        replies: []
                    }
                ]
            }
        ]
    },
    {
        id: "6",
        username: "bookworm_101",
        text: "Just finished 'Dune' and can't stop thinking about it. Such a complex world!",
        replies: [
            {
                id: "6-1",
                username: "sci-fi_fan",
                text: "One of the best sci-fi novels ever written. Are you going to read the sequels?",
                replies: [
                    {
                        id: "6-1-1",
                        username: "bookworm_101",
                        text: "I think I might! The ending left me wanting more.",
                        replies: []
                    }
                ]
            }
        ]
    },
    {
        id: "7",
        username: "nature_lover",
        text: "Spent the weekend camping in the mountains. Nothing beats waking up to the sound of birds chirping.",
        replies: [
            {
                id: "7-1",
                username: "outdoor_adventurer",
                text: "That sounds so peaceful. Did you see any wildlife?",
                replies: [
                    {
                        id: "7-1-1",
                        username: "nature_lover",
                        text: "Yeah, we saw a couple of deer and even an eagle!",
                        replies: []
                    }
                ]
            }
        ]
    },
    {
        id: "8",
        username: "history_buff",
        text: "Learning about ancient civilizations always fascinates me. Just finished a documentary on the Mayans.",
        replies: [
            {
                id: "8-1",
                username: "docu_fan",
                text: "That sounds interesting! What’s one thing that stood out to you?",
                replies: [
                    {
                        id: "8-1-1",
                        username: "history_buff",
                        text: "Their understanding of astronomy was incredibly advanced for their time.",
                        replies: []
                    }
                ]
            }
        ]
    },
    {
        id: "9",
        username: "gamer_guy",
        text: "Finally beat the hardest boss in my favorite game. Took me hours but totally worth it.",
        replies: [
            {
                id: "9-1",
                username: "pro_gamer",
                text: "Nice! Which game are you talking about?",
                replies: [
                    {
                        id: "9-1-1",
                        username: "gamer_guy",
                        text: "It’s 'Elden Ring'. That final boss fight was brutal!",
                        replies: []
                    }
                ]
            }
        ]
    },
    {
        id: "10",
        username: "pet_lover",
        text: "Adopted a rescue dog today. Can’t wait to give her a loving home!",
        replies: [
            {
                id: "10-1",
                username: "animal_ally",
                text: "That’s wonderful! What’s her name?",
                replies: [
                    {
                        id: "10-1-1",
                        username: "pet_lover",
                        text: "Her name is Luna. She’s a sweetheart!",
                        replies: []
                    }
                ]
            }
        ]
    }
];
