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
            else if (x === "**") return create("✪");
            else if (x === "*1") return create("➊");
            else if (x === "*2") return create("➋");
            else if (x === "*3") return create("➌");
            else if (x === "*4") return create("➍");
            else if (x === "*5") return create("➎");
            else if (x === "$rn") return create("⬩");
            else if (x === "$jd") return create("☘");
            else if (x === "$ab") return create("⸕");
            else if (x === "$to") return create("✧");
            else if (x === "$sa") return create("✎");
            else if (x === "$am") return create("❈");
            else if (x === "$js") return create("❁");
            else if (x === "$op") return create("❂");
            else if (x === "$ru") return create("♥");
            else if (x === "$ci") return create("☘");
            else if (x === "$aq") return create("α");
            else if (x === "$pe") return create("☘");
            else if (x === "$on") return create("☣");
            else if (x === "$ci") return create("❥");
            else if (x === "$co") return create("⚔");
            else if (x === "$of") return create("☠");
            else if (x === "$de") return create("☤");
            else if (x === "$mi") return create("✦");
            else if (x === "$un") return create("❂");
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
