import "./tolltip-style.sass";

class Tooltip {
  constructor(element) {
    this.element = element;
    this.addTooltip = this.addTooltip.bind(this);
  }

  addTooltip() {
    this.removeTooltip();
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.innerHTML = `
      <div class="arrow"></div>
      <div class="tooltip__title">${this.element.title}</div>
      <div class="tooltip__content">${this.element.dataset.content}</div>
    `;
    document.body.appendChild(tooltip);
    const arrow = document.querySelector(".arrow");
    if (
      this.element.offsetTop - tooltip.offsetHeight - arrow.offsetHeight >
      0
    ) {
      tooltip.style.top =
        this.element.offsetTop -
        tooltip.offsetHeight -
        arrow.offsetHeight +
        "px";
    } else {
      tooltip.style.top =
        this.element.offsetTop +
        this.element.offsetHeight +
        arrow.offsetHeight +
        "px";
      arrow.remove();
    }

    tooltip.style.left =
      this.element.offsetLeft +
      this.element.offsetWidth / 2 -
      tooltip.offsetWidth / 2 +
      "px";
    tooltip.style.opacity = "1";
    tooltip.style.transform = "translateY(0)";

    return tooltip;
  }

  removeTooltip() {
    const tooltip = document.querySelector(".tooltip");
    if (!tooltip) return;

    tooltip.style.opacity = "0";
    setTimeout(() => tooltip.remove(), 500);
  }
}

export default Tooltip;
