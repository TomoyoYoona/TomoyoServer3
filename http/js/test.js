$().ready(()=>{
    const e = document.querySelector(".y-measure");
    const container = document.querySelector(".container");

    // Defaults according to W3C
    const shortHandDefaults = {
    "animation-duration": "0s",
    "animation-delay": "0s",
    "animation-name": "none",
    "animation-play-state": "running",
    "animation-fill-mode": "none",
    "animation-direction": "normal",
    "animation-timing-function": "ease",
    "animation-iteration-count": 1
    };
    // Current CSS values, including animation- prefix.
    const shortHandProps = {};

    const canvas = document.querySelector("canvas");
    // Set origin to lower left and Y increasing
    canvas.style.transform = "scaleY(-1)";
    const ctx = canvas.getContext("2d");
    const width = 256;
    const height = 256;

    const parseMs = (str) => {
    if (!str) return 0;
    if (str.endsWith("ms")) {
        return Number(str.substring(0, str.length - 2));
    }
    if (str.endsWith("s")) {
        return Number(str.substring(0, str.length - 1)) * 1000;
    }
    throw new Error("Could not parse to ms: " + str);
    };

    const parseIterationCount = (str) => {
    if (!str) return 1;
    if (str === "infinite") return Number.MAX_VALUE;
    return Number(str);
    };

    const graph = {
    startTime: 0,
    delay: 0,
    duration: 0,
    iterationsCompleted: 0,
    history: [],
    historyPointer: 0,

    start() {
        this.startTime = window.performance.now();

        this.duration = parseMs(shortHandProps["animation-duration"] || "500ms");
        this.delay = parseMs(shortHandProps["animation-delay"] || "0s");

        this.iterationCount = parseIterationCount(
        shortHandProps["animation-iteration-count"]
        );

        this.iterationsCompleted = 0;

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.historyPointer = -1;
        this.draw();
    },

    draw(animationState) {
        if (!animationState) {
        this.history = [];
        animationState = {
            aborted: false,
            abort() {
            this.aborted = true;
            }
        };
        this.pendingAnimation = animationState;
        }
        if (this.pendingAnimation !== animationState) {
        this.pendingAnimation.abort();
        }
        if (animationState.aborted) {
        return;
        }

        const t = window.performance.now();
        let elapsed = t - this.startTime;

        if (elapsed - this.delay > this.duration * (this.iterationsCompleted + 1)) {
        this.iterationCount--;
        this.iterationsCompleted += 1;
        }
        const done = this.iterationCount === 0;

        if (done) {
        return;
        }

        const x = (width * elapsed) / 1000;
        const y = height - e.offsetTop;
        const HISTORY_MAX = width * 5;
        this.historyPointer = this.historyPointer + 1;
        this.historyPointer = this.historyPointer % HISTORY_MAX;
        this.history[this.historyPointer] = [x, y];

        ctx.setTransform(1, 0, 0, 1, 0, 0);

        // Clear canvas and draw right rect
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "#1a1b1f";
        ctx.fillRect(width, 0, width * 1.5, height);

        if (x > width) {
        ctx.setTransform(1, 0, 0, 1, width - x, 0);
        }

        const historyStart = this.history[this.historyPointer + 1]
        ? this.historyPointer + 1
        : 0;

        ctx.beginPath();
        const [x0, y0] = this.history[historyStart];
        ctx.moveTo(x0, y0);
        let i = historyStart;
        while (true) {
        i = (i + 1) % HISTORY_MAX;
        if (i === historyStart || !this.history[i]) {
            break;
        }
        const [xh, yh] = this.history[i];
        ctx.lineTo(xh, yh);
        }

        ctx.strokeStyle = "white";
        ctx.stroke();

        // Time bar
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
        ctx.stroke();

        requestAnimationFrame(() => this.draw(animationState));
    }
    };

    const shortHandNames = [
    "duration",
    "timing-function",
    "delay",
    "iteration-count",
    "direction",
    "fill-mode",
    "play-state",
    "name"
    ];

    function updateShortHand() {
    const e = document.querySelector(".shorthand");
    const props = [];
    for (const prop of shortHandNames) {
        const defaultValue = shortHandDefaults[`animation-${prop}`];
        if (shortHandProps[`animation-${prop}`] === defaultValue) {
        continue;
        }
        props.push(shortHandProps[`animation-${prop}`]);
    }
    e.innerText = "animation: " + props.join(" ") + ";";
    }

    function addControl(propertyName, cssPropertyName, values) {
    const wrapper = document.createElement("div");
    wrapper.style.marginBottom = "4px";
    wrapper.innerHTML = `
        <label class="prop">
        <code>${cssPropertyName}: </code>
        </label>
        <button></button>;
    `;
    const button = wrapper.querySelector("button");
    let i = -1;
    function cycleProperty() {
        i = (i + 1) % values.length;
        const value = values[i];
        e.style[propertyName] = value;
        shortHandProps[cssPropertyName] = value;
        button.innerHTML = `<code>${value}</code>`;
        updateShortHand();
        const resetBox = document.querySelector(".reset");
        if (resetBox.checked) {
        e.remove();
        container.append(e);
        graph.start();
        }
    }
    cycleProperty();
    button.onclick = cycleProperty;
    document.querySelector(".controls").append(wrapper);
    }

    addControl("animationDuration", "animation-duration", ["2s", "1s", "500ms"]);
    addControl("animationTimingFunction", "animation-timing-function", [
    "ease",
    "ease-out",
    "ease-in",
    "ease-in-out",
    "linear"
    ]);
    addControl("animationDelay", "animation-delay", ["0s", "1s"]);
    addControl("animationFillMode", "animation-fill-mode", [
    "none",
    "forwards",
    "backwards",
    "both"
    ]);
    addControl("animationDirection", "animation-direction", [
    "normal",
    "reverse",
    "alternate",
    "alternate-reverse"
    ]);
    addControl("animationName", "animation-name", ["erratic", "ascend", "descend"]);
    addControl("animationPlayState", "animation-play-state", ["running", "paused"]);
    addControl("animationIterationCount", "animation-iteration-count", [
    "infinite",
    1,
    2
    ]);

    updateShortHand();

    const clickToCopy = (elem) => {
    const copyToClipboard = (str) => {
        const el = document.createElement("textarea");
        el.value = str;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
    };
    elem.onclick = (e) => {
        copyToClipboard(e.target.innerText);
        e.target.classList.add("copied");
    };
    elem.onmouseleave = (e) => e.target.classList.remove("copied");
    };

    clickToCopy(document.querySelector(".shorthand"));

    graph.start();

})