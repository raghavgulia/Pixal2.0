let isErasing = false;
let colors = [];

const copyToClipboard = (str) => {
  const el = document.createElement("textarea");
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

document.getElementById("maker").addEventListener("click", () => {
  document.querySelector(".cont").innerHTML = "";
  document.documentElement.style.setProperty(
    "--width",
    document.getElementById("width").value
  );
  document.documentElement.style.setProperty(
    "--height",
    document.getElementById("height").value
  );
  document.documentElement.style.setProperty(
    "--rows",
    document.getElementById("rows").value
  );
  document.documentElement.style.setProperty(
    "--columns",
    document.getElementById("columns").value
  );
  for (
    let index = 0;
    index <
    document.getElementById("rows").value *
      document.getElementById("columns").value;
    index++
  ) {
    const template = `<div class="box box${index + 1}"></div>`;
    document.querySelector(".cont").insertAdjacentHTML("beforeend", template);
  }
  document.querySelectorAll(".box").forEach((e) => {
    e.addEventListener("mousedown", () => {
      if (!isErasing) {
        e.style.backgroundColor = document.getElementById("color").value;
        return;
      }
      e.style.backgroundColor = "transparent";
    });
  });
  document.getElementById("erase").addEventListener("click", () => {
    isErasing = !isErasing;
  });
});

document.getElementById("creater").addEventListener("click", () => {
  colors = [];
  let str = `:root {
    --width: ${window
      .getComputedStyle(document.body)
      .getPropertyValue("--width")};
    --height: ${window
      .getComputedStyle(document.body)
      .getPropertyValue("--height")};
    --rows:${window.getComputedStyle(document.body).getPropertyValue("--rows")};
    --columns:${window
      .getComputedStyle(document.body)
      .getPropertyValue("--columns")};
  }
  
  .cont {
    width: var(--width);
    height: var(--height);
    background-color: transparent;
    display: grid;
    grid-template-rows: repeat(var(--rows), 1fr);
    grid-template-columns: repeat(var(--columns), 1fr);
  }\n`;
  document.querySelectorAll(".box").forEach((e, pos) => {
    colors.push(e.style.backgroundColor);
    colors = [...new Set(colors)];
  });
  colors.forEach((e, pos) => {
    str += `\n.box-color-${pos + 1} {
      background-color:${e ? e : "transparent"};
  }\n`;
  });
  let loda = "";
  for (
    let index = 0;
    index <
    window.getComputedStyle(document.body).getPropertyValue("--rows") *
      window.getComputedStyle(document.body).getPropertyValue("--columns");
    index++
  ) {
    const a = document.querySelector(`.box${index + 1}`);
    loda += `<div class="box box-color-${
      colors.indexOf(a.style.backgroundColor) + 1
    }"></div>`;
  }
  document.getElementById("gas").innerText = `<div class="cont">${loda}</div>`;
  document.getElementById("sass").innerText = str;
  copyToClipboard(str);
});
