export const data = [
  {
    id: "2022-07-30_the_joruney_begins",
    title: "The Journey Begins",
    date: "2022-07-30",
    body: "At the beginning of Summer I started a new project. The objective was to create a Redux-based game engine. I love FP and wanted to experiment how good it can be for developing video games.",
  },
  {
    id: "2022-08-22_entity_store",
    title: "An Entity-Based Store",
    date: "2022-08-22",
    body: "This was already my second attempt at creating a game engine. The first time I noticed that Redux was not really a good fit, so I created my own.",
  },
  {
    id: "2023-08-28_game_ai_algorithms",
    title: "Game AI Algorithms",
    date: "2023-08-28",
    body: "The store worked pretty well, but then I lost interest. A year after, I started reading a book on game AI algorithms. This renewed a new sparkle of motivation, because I wanted to experiment to develop those algorithms with FP instead of OOP.",
  },
  {
    id: "2023-11-11_canvas",
    title: "Canvas",
    date: "2023-11-11",
    body: "So far the game engine used React as the rendering layer. But there's only so much you can do with the DOM. The engine must also be render-agnostic. So I started adding a 2D canvas rendering layer.",
  },
  {
    id: "2024-05-28_collision_detection",
    title: "Collision Detection",
    date: "2024-05-28",
    body: "This is where I started losing motivation again. Collision detection is a complex topic. You can do AABB, but there's a lot more if you want it to be realistic. A few things scare me, and this was one of them. Also, I was distracted by getting married!",
  },
  {
    id: "2025-02-14_coding_is_coping",
    title: "Coding Is Coping",
    date: "2025-02-14",
    body: "Right after my wedding, things went south pretty fast. My mother was diagnosed with cancer and died in March. In the meantime LLMs started to threaten my relevance as a developer. But LLMs also made my life a bit easier, boosting my confidence about my engine. So, after a period of burnout, I slowly started coding again. That was probably also a way to cope for what was happening around me.",
  },
  {
    id: "2025-07-24_lets_talk",
    title: "Let's Talk",
    date: "2025-07-24",
    body: "A friend of mine, who organizes talks, needed a speaker for his mid-August event. Nobody was supposed to attend, since everyone was on vacation, it was just to fill the gap. I proposed the engine, and while preparing the slides and a new example for them, I gained so much more interest in what I had done so far.",
  },
  {
    id: "2025-10-05_coding_spree",
    title: "Coding Spree",
    date: "2025-10-05",
    body: "I couldn't stop coding. LLMs gave me the validation, and the low-level coding capabilities, to write a really cool game engine. I added a scaffolding tool, sound and touch support, ... heck, I even created my own JavaScript superset for vector operations! But then I realized something...",
  },
  {
    id: "2025-10-11_not_only_games",
    title: "Not Only Games",
    date: "2025-10-11",
    body: "...The store was a perfect fit for webapps too! What if the Inglorious Store was used as a drop-in replacement for Redux in a React webapp? I started experimenting.",
  },
  {
    id: "2025-11-12_not_only_react",
    title: "Not Only React",
    date: "2025-11-12",
    body: "By the end of 2025 I was realizing that React was overkill for entity-based webapps: moving all logic to the store means we don't need lifecycle hooks, not even the virutal DOM! After a bit of scouting I found out that Google's lit-html was the lightweight renderer I needed.",
  },
  {
    id: "2025-12-20_inglorious_web",
    title: "Inglorious Web",
    date: "2025-12-20",
    body: "The Inglorious Web framework was born. Yes, framework. Not library. The software had to provide default implementations for the most common developer needs, such as a router, a form, a table, a select, a virtualized list. The only two missing things to make it become a framework worth using were charts and SSG/SSR.",
  },
  {
    id: "2025-12-31_inglorious_ssx",
    title: "Inglorious SSX",
    date: "2025-12-31",
    body: "I soon realized that Server-Side Rendering is impossible with the Inglorious Web framework. Because there's a better alternative! It's what I call Server-Side Xecution. The pages are statically generated, then hydration on the client regenerates the templates' structure and add event handlers. It's so simple and surprisingly performant! Even the skeptical Claude said: 'You're on the path to glory.'",
  },
]
