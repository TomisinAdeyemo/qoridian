const squareField =
  document.getElementById(
    "globalSquareField"
  );

const parallaxElements =
  document.querySelectorAll(
    "[data-parallax]"
  );

const menuToggle =
  document.querySelector(
    ".menu-toggle"
  );

const mobileMenu =
  document.querySelector(
    ".mobile-menu"
  );

const reduceMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

const mobileQuery =
  window.matchMedia(
    "(max-width: 560px)"
  );


/* =====================================================
   GLOBAL FLOATING SQUARES
===================================================== */

function createSquareField() {

  squareField.innerHTML = "";


  const width =
    window.innerWidth;


  /*
    Responsive density.
  */

  const count =
    width <= 560
      ? 125
      : width <= 900
        ? 180
        : 270;


  const fragment =
    document.createDocumentFragment();


  for (
    let i = 0;
    i < count;
    i++
  ) {

    const square =
      document.createElement(
        "span"
      );


    square.className =
      "square";


    /*
      Small square dimensions.
    */

    const size =
      2 +
      Math.random() * 4;


    /*
      Random position.
    */

    const x =
      Math.random() * 100;

    const y =
      Math.random() * 100;


    /*
      Faster movement.
    */

    const duration =
      4.5 +
      Math.random() * 7;


    const delay =
      -(Math.random() * 10);


    /*
      Movement distance.
    */

    const moveX =
      (
        Math.random() -
        0.5
      ) * 70;


    const moveY =
      (
        Math.random() -
        0.5
      ) * 70;


    /*
      Increased visibility.
    */

    const opacity =
      0.07 +
      Math.random() * 0.18;


    const pulse =
      2.8 +
      Math.random() * 4;


    square.style.setProperty(
      "--size",
      `${size}px`
    );


    square.style.setProperty(
      "--x",
      `${x}%`
    );


    square.style.setProperty(
      "--y",
      `${y}%`
    );


    square.style.setProperty(
      "--duration",
      `${duration}s`
    );


    square.style.setProperty(
      "--delay",
      `${delay}s`
    );


    square.style.setProperty(
      "--move-x",
      `${moveX}px`
    );


    square.style.setProperty(
      "--move-y",
      `${moveY}px`
    );


    square.style.setProperty(
      "--opacity",
      opacity
    );


    square.style.setProperty(
      "--pulse",
      `${pulse}s`
    );


    /*
      A small percentage of squares
      use different tones.
    */

    const variant =
      Math.random();


    if (variant > 0.94) {

      square.classList.add(
        "cool"
      );


      square.style.setProperty(
        "--cool-opacity",
        0.04 +
        Math.random() * 0.09
      );

    }


    else if (variant > 0.78) {

      square.classList.add(
        "soft"
      );


      square.style.setProperty(
        "--soft-opacity",
        0.04 +
        Math.random() * 0.12
      );

    }


    fragment.appendChild(
      square
    );

  }


  squareField.appendChild(
    fragment
  );

}


createSquareField();


/* =====================================================
   PARALLAX ENGINE
===================================================== */

let targetScroll =
  window.scrollY;

let currentScroll =
  window.scrollY;


window.addEventListener(
  "scroll",
  () => {

    targetScroll =
      window.scrollY;

  },
  {
    passive: true
  }
);


function animateSite() {

  if (!reduceMotion.matches) {


    /*
      Smooth scroll interpolation.
    */

    currentScroll +=
      (
        targetScroll -
        currentScroll
      ) * 0.075;


    /*
      GLOBAL BACKGROUND PARALLAX

      Very subtle because the background
      is supposed to feel like one continuous
      environment.
    */

    const backgroundOffset =
      currentScroll * 0.018;


    squareField.style.transform =
      `translate3d(
        0,
        ${-backgroundOffset}px,
        0
      )`;


    /*
      Mobile gets approximately 38%
      of desktop parallax intensity.
    */

    const multiplier =
      mobileQuery.matches
        ? 0.38
        : 1;


    /*
      Every element with
      data-parallax participates.
    */

    parallaxElements.forEach(
      (element) => {

        const speed =
          (
            parseFloat(
              element.dataset.parallax
            ) || 0
          ) * multiplier;


        const rect =
          element.getBoundingClientRect();


        const elementCenter =
          rect.top +
          rect.height / 2;


        const viewportCenter =
          window.innerHeight / 2;


        const distance =
          elementCenter -
          viewportCenter;


        const offset =
          distance * speed;


        element.style.transform =
          `translate3d(
            0,
            ${offset}px,
            0
          )`;

      }
    );

  }


  requestAnimationFrame(
    animateSite
  );

}


animateSite();


/* =====================================================
   MOBILE MENU
===================================================== */

function closeMenu() {

  menuToggle.classList.remove(
    "active"
  );

  mobileMenu.classList.remove(
    "open"
  );

  menuToggle.setAttribute(
    "aria-expanded",
    "false"
  );

  mobileMenu.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove(
    "menu-open"
  );

}


menuToggle.addEventListener(
  "click",
  () => {

    const isOpen =
      mobileMenu.classList.toggle(
        "open"
      );


    menuToggle.classList.toggle(
      "active",
      isOpen
    );


    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );


    mobileMenu.setAttribute(
      "aria-hidden",
      String(!isOpen)
    );


    document.body.classList.toggle(
      "menu-open",
      isOpen
    );

  }
);


mobileMenu
  .querySelectorAll("a")
  .forEach(
    (link) => {

      link.addEventListener(
        "click",
        closeMenu
      );

    }
  );


/* =====================================================
   RESPONSIVE SQUARE DENSITY
===================================================== */

let previousMobileState =
  mobileQuery.matches;


window.addEventListener(
  "resize",
  () => {

    const currentMobileState =
      mobileQuery.matches;


    if (
      currentMobileState !==
      previousMobileState
    ) {

      previousMobileState =
        currentMobileState;

      createSquareField();

    }


    if (
      window.innerWidth > 820
    ) {

      closeMenu();

    }

  }
);

/* =====================================================
   LIVING SYSTEM NETWORK
===================================================== */

const systemMap =
  document.querySelector(".system-map");

if (systemMap) {

  const nodeElements =
    [...systemMap.querySelectorAll(".system-node")];

  const nodeMap = {};

  nodeElements.forEach((node) => {

    nodeMap[
      node.dataset.node
    ] = node;

  });


  const connections =
    [...systemMap.querySelectorAll("line")].map(
      (line) => {

        const [
          from,
          to
        ] =
          line.dataset.connect.split(" ");

        return {
          line,
          from,
          to
        };

      }
    );


  /*
    Each object has its own motion personality.

    The movement is intentionally small.
    We don't want these to look like floating
    UI cards. They should feel connected.
  */

  const motion = {

    supply: {
      x: 9,
      y: 6,
      speed: 0.00055,
      phase: 0.4
    },

    demand: {
      x: -7,
      y: 8,
      speed: 0.00048,
      phase: 1.8
    },

    competing: {
      x: 8,
      y: -6,
      speed: 0.00062,
      phase: 2.6
    },

    infrastructure: {
      x: -8,
      y: -5,
      speed: 0.00053,
      phase: 0.9
    },

    population: {
      x: 6,
      y: 8,
      speed: 0.00044,
      phase: 3.1
    },

    climate: {
      x: -7,
      y: 6,
      speed: 0.00058,
      phase: 4.2
    }

  };


  /*
    Keep the original CSS position.

    The animation only adds a small offset
    on top of the responsive layout.
  */

  function getNodeCenter(node) {

    const mapRect =
      systemMap.getBoundingClientRect();

    const nodeRect =
      node.getBoundingClientRect();

    return {

      x:
        nodeRect.left -
        mapRect.left +
        nodeRect.width / 2,

      y:
        nodeRect.top -
        mapRect.top +
        nodeRect.height / 2

    };

  }


  /*
    SVG connection point creator.
  */

  const pointsGroup =
    systemMap.querySelector(
      ".connection-points"
    );


  function addConnectionPoint(
    x,
    y
  ) {

    const point =
      document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
      );


    point.classList.add(
      "connection-point"
    );


    point.setAttribute(
      "width",
      "5"
    );


    point.setAttribute(
      "height",
      "5"
    );


    point.setAttribute(
      "x",
      x - 2.5
    );


    point.setAttribute(
      "y",
      y - 2.5
    );


    pointsGroup.appendChild(
      point
    );

  }


  /*
    Main network animation.
  */

  function animateNetwork(
    timestamp
  ) {

    if (
      !reduceMotion.matches
    ) {

      /*
        Move each node independently.
      */

      Object.entries(
        motion
      ).forEach(
        ([
          name,
          settings
        ]) => {

          const node =
            nodeMap[name];


          if (!node) {
            return;
          }


          /*
            Different sine/cosine movement
            makes the system feel organic.
          */

          const x =
            Math.sin(
              timestamp *
              settings.speed +
              settings.phase
            ) *
            settings.x;


          const y =
            Math.cos(
              timestamp *
              settings.speed * 0.87 +
              settings.phase
            ) *
            settings.y;


          /*
            Keep the node's responsive CSS
            position untouched.
          */

          node.style.transform =
            `translate3d(
              ${x}px,
              ${y}px,
              0
            )`;

        }
      );

    }


    /*
      Now update every string.

      Because this happens after the nodes
      move, the lines always point to them.
    */

    connections.forEach(
      ({
        line,
        from,
        to
      }) => {

        const fromCenter =
          getNodeCenter(
            nodeMap[from]
          );

        const toCenter =
          getNodeCenter(
            nodeMap[to]
          );


        line.setAttribute(
          "x1",
          fromCenter.x
        );


        line.setAttribute(
          "y1",
          fromCenter.y
        );


        line.setAttribute(
          "x2",
          toCenter.x
        );


        line.setAttribute(
          "y2",
          toCenter.y
        );

      }
    );


    requestAnimationFrame(
      animateNetwork
    );

  }


  requestAnimationFrame(
    animateNetwork
  );

}

/* =====================================================
   ONE-WAY SCROLL-DRIVEN INTELLIGENCE COUNTER
===================================================== */

const statSection =
  document.querySelector(".intelligence-stat-section");

const intelligenceCounter =
  document.getElementById("intelligenceCounter");

if (statSection && intelligenceCounter) {

  const MAX_VALUE = 2000;

  let displayedValue = 0;
  let targetValue = 0;

  /*
    Once this becomes true, the counter
    will permanently remain at 2000.
  */
  let counterLocked = false;


  function updateCounter() {

    /*
      Once 2000 has been reached,
      completely stop responding to scroll.
    */
    if (counterLocked) {
      targetValue = MAX_VALUE;
      return;
    }


    const rect =
      statSection.getBoundingClientRect();

    const viewportHeight =
      window.innerHeight;


    const start =
      viewportHeight * 0.85;

    const end =
      -rect.height * 0.15;


    const distance =
      start - end;


    const progress =
      (start - rect.top) /
      distance;


    const normalized =
      Math.max(
        0,
        Math.min(
          1,
          progress
        )
      );


    /*
      Smooth easing.
    */
    const eased =
      normalized *
      normalized *
      (3 - 2 * normalized);


    targetValue =
      Math.round(
        eased * MAX_VALUE
      );


    /*
      Lock permanently once the counter
      reaches the maximum.
    */
    if (targetValue >= MAX_VALUE) {

      targetValue =
        MAX_VALUE;

      counterLocked =
        true;

    }

  }


  function animateCounter() {

    /*
      If locked, don't interpolate anymore.
      Just keep the number at 2000.
    */
    if (counterLocked) {

      displayedValue =
        MAX_VALUE;

      intelligenceCounter.textContent =
        "2,000";

      return;
    }


    displayedValue +=
      (
        targetValue -
        displayedValue
      ) * 0.12;


    const roundedValue =
      Math.round(
        displayedValue
      );


    intelligenceCounter.textContent =
      roundedValue.toLocaleString();


    requestAnimationFrame(
      animateCounter
    );

  }


  window.addEventListener(
    "scroll",
    updateCounter,
    {
      passive: true
    }
  );


  window.addEventListener(
    "resize",
    updateCounter
  );


  updateCounter();

  animateCounter();

}

/* =====================================================
   METHOD INTERACTIVE PANELS
===================================================== */

const methodPanels =
  document.querySelectorAll(
    ".method-panel"
  );


methodPanels.forEach(
  (panel) => {

    const trigger =
      panel.querySelector(
        ".method-panel-trigger"
      );


    trigger.addEventListener(
      "click",
      () => {

        /*
          If already active, don't collapse it.

          This guarantees there is always
          one open panel.
        */

        if (
          panel.classList.contains(
            "active"
          )
        ) {
          return;
        }


        /*
          Close every other panel.
        */

        methodPanels.forEach(
          (otherPanel) => {

            const otherTrigger =
              otherPanel.querySelector(
                ".method-panel-trigger"
              );


            const isCurrent =
              otherPanel === panel;


            otherPanel.classList.toggle(
              "active",
              isCurrent
            );


            otherTrigger.setAttribute(
              "aria-expanded",
              String(isCurrent)
            );

          }
        );

      }
    );

  }
);


/* =====================================================
   QORIDIAN — SCRAMBLE TEXT REVEAL
===================================================== */

const scrambleCharacters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&?";


function scrambleText(element) {

  const originalText =
    element.textContent.trim();

  const characters =
    originalText.split("");

  let resolvedCount = 0;

  /*
   * Store the original text so we can
   * progressively reveal it.
   */

  element.dataset.originalText =
    originalText;


  /*
   * Start with scrambled characters.
   */

  function generateScrambledText() {

    return characters
      .map((character, index) => {

        /*
         * Keep spaces untouched.
         */

        if (character === " ") {
          return " ";
        }

        /*
         * Characters before the resolved
         * point are now locked.
         */

        if (index < resolvedCount) {
          return character;
        }

        /*
         * Everything else keeps scrambling.
         */

        return scrambleCharacters[
          Math.floor(
            Math.random() *
            scrambleCharacters.length
          )
        ];

      })
      .join("");

  }


  /*
   * Run the scrambling animation.
   */

  const interval =
    setInterval(() => {

      element.textContent =
        generateScrambledText();

      /*
       * Resolve one character at a time.
       */

      resolvedCount++;


      /*
       * Once every character has resolved,
       * restore the exact original text.
       */

      if (
        resolvedCount >
        characters.length
      ) {

        clearInterval(interval);

        element.textContent =
          originalText;

      }

    }, 45);

}


/* =====================================================
   TRIGGER WHEN HEADINGS ENTER VIEW
===================================================== */

const scrambleElements =
  document.querySelectorAll(
    ".scramble-text"
  );


const scrambleObserver =
  new IntersectionObserver(
    (entries, observer) => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) {
          return;
        }


        /*
         * Don't run the animation again
         * when the user scrolls back up.
         */

        if (
          entry.target.dataset.scrambled === "true"
        ) {
          return;
        }


        entry.target.dataset.scrambled =
          "true";


        scrambleText(
          entry.target
        );


        observer.unobserve(
          entry.target
        );

      });

    },
    {
      threshold: 0.35
    }
  );


scrambleElements.forEach(element => {

  scrambleObserver.observe(
    element
  );

});

/* =====================================================
   QORIDIAN — SECTION LABEL SCRAMBLE
===================================================== */

const labelCharacters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";


function scrambleLabel(element) {

  const original =
    element.textContent;

  const characters =
    original.split("");

  let resolved = 0;

  const interval =
    setInterval(() => {

      element.textContent =
        characters
          .map((char, index) => {

            /* Keep spaces */
            if (char === " ") {
              return " ";
            }

            /* Resolved characters */
            if (index < resolved) {
              return char;
            }

            /* Scrambled characters */
            return labelCharacters[
              Math.floor(
                Math.random() *
                labelCharacters.length
              )
            ];

          })
          .join("");

      resolved++;

      if (
        resolved >
        characters.length
      ) {

        clearInterval(interval);

        element.textContent =
          original;

      }

    }, 28);
}

const labelElements =
  document.querySelectorAll(
    ".scramble-label-text"
  );


const labelObserver =
  new IntersectionObserver(
    (entries, observer) => {

      entries.forEach(entry => {

        if (
          !entry.isIntersecting
        ) {
          return;
        }


        if (
          entry.target.dataset.scrambled === "true"
        ) {
          return;
        }


        entry.target.dataset.scrambled =
          "true";


        scrambleLabel(
          entry.target
        );


        observer.unobserve(
          entry.target
        );

      });

    },
    {
      threshold: 0.5
    }
  );


labelElements.forEach(element => {

  labelObserver.observe(
    element
  );

});