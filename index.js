const input = document.querySelector("textarea");
const box = document.querySelector("section");

render((input.value = localStorage.getItem("lore:text") ?? ""));

input.addEventListener("input", (_) => {
    localStorage.setItem("lore:text", input.value);

    render(input.value);
});

function render(lore) {
    const colors = {
        0: "#000000",
        1: "#0000aa",
        2: "#00aa00",
        3: "#00aaaa",
        4: "#aa0000",
        5: "#aa00aa",
        6: "#ffaa00",
        7: "#aaaaaa",
        8: "#555555",
        9: "#5555ff",
        a: "#55ff55",
        b: "#55ffff",
        c: "#ff5555",
        d: "#ff55ff",
        e: "#ffff55",
        f: "#dddddd",
    };

    let modifiers = {
        color: "f",
        italic: false,
        bold: false,
        obfuscated: false,
        chroma: false,
    };

    function create(text) {
        return `<span class="${modifiers.obfuscated ? "obfuscated" : ""} ${modifiers.chroma ? "chroma" : ""}" style="${
            modifiers.chroma ? "" : `filter: blur(0); background: ${colors[modifiers.color]}; color: transparent; background-clip: text; font-smoothing: never;`
        }; font-style: ${modifiers.italic ? "italic" : "normal"}; font-weight: ${modifiers.bold ? "bold" : "normal"}">${text}</span>`;
    }

    box.innerHTML = Array.from(lore.match(/(&.|\*.|\$[a-z][a-z]|.|\s)/g) ?? [])
        .map((x) => {
            if (x === "&0") modifiers.color = "0";
            else if (x === "&1") modifiers.color = "1";
            else if (x === "&2") modifiers.color = "2";
            else if (x === "&3") modifiers.color = "3";
            else if (x === "&4") modifiers.color = "4";
            else if (x === "&5") modifiers.color = "5";
            else if (x === "&6") modifiers.color = "6";
            else if (x === "&7") modifiers.color = "7";
            else if (x === "&8") modifiers.color = "8";
            else if (x === "&9") modifiers.color = "9";
            else if (x === "&a") modifiers.color = "a";
            else if (x === "&b") modifiers.color = "b";
            else if (x === "&c") modifiers.color = "c";
            else if (x === "&d") modifiers.color = "d";
            else if (x === "&e") modifiers.color = "e";
            else if (x === "&f") modifiers.color = "f";
            else if (x === "&k") modifiers.obfuscated = true;
            else if (x === "&l") modifiers.bold = true;
            else if (x === "&o") modifiers.italic = true;
            else if (x === "&x") modifiers.chroma = true;
            else if (x === "&r")
                modifiers = {
                    color: "f",
                    italic: false,
                    bold: false,
                    obfuscated: false,
                    chroma: false,
                };
            else if (x.length === 2 && x[0] === "*")
                return create(
                    {
                        "*": "✪",
                        1: "➊",
                        2: "➋",
                        3: "➌",
                        4: "➍",
                        5: "➎",
                    }[x[1]]
                );
            else if (x.length === 3 && x[0] === "$")
                return create(
                    {
                        rn: "⬩",
                        jd: "☘",
                        ab: "⸕",
                        to: "✧",
                        sa: "✎",
                        am: "❈",
                        js: "❁",
                        op: "❂",
                        ru: "♥",
                        ci: "☘",
                        aq: "α",
                        pe: "☘",
                        on: "☣",
                        ch: "❥",
                        co: "⚔",
                        of: "☠",
                        de: "☤",
                        mi: "✦",
                        un: "❂",
                        dy: "✿",
                        fg: "⚚",
                        fr: "⫽",
                        ps: "⦾",
                        vi: "♨",
                        me: "☄",
                        ws: "☯",
                        as: "⚔",
                        mf: "✯",
                        pl: "♣",
                        ad: "๑",
                        hr: "❣",
                        fs: "☂",
                    }[x[1] + x[2]]
                );
            else return create(x);
        })
        .filter((x) => x !== undefined)
        .join("");

    document.querySelectorAll(".obfuscated").forEach((span) => {
        const letters = [..."1234567890abcdefghijklmnopqrstuvwxyz~!@#$%^&*()-=_+{}[]"];

        span.textContent = letters[Math.floor(Math.random() * letters.length)];

        setInterval(() => {
            span.textContent = letters[Math.floor(Math.random() * letters.length)];
        }, 50);
    });
}
