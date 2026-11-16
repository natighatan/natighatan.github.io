(function () {
  "use strict";

  var formatPercent = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  function percent(value) {
    return formatPercent.format(value * 100) + "%";
  }

  function updateMix(container, key, mildShare, description) {
    var mildPercent = Math.round(mildShare * 100);
    var severePercent = 100 - mildPercent;
    var mildFill = container.querySelector('[data-mild-fill="' + key + '"]');
    var severeFill = container.querySelector('[data-severe-fill="' + key + '"]');
    var bar = container.querySelector('[data-mix-bar="' + key + '"]');
    var label = container.querySelector('[data-mix-label="' + key + '"]');

    mildFill.style.width = mildPercent + "%";
    severeFill.style.width = severePercent + "%";
    bar.setAttribute("aria-label", description + ": " + mildPercent + "% mild cases and " + severePercent + "% severe cases");
    label.textContent = mildPercent + "% mild / " + severePercent + "% severe";
  }

  function updateRate(container, hospital, rate) {
    var percentValue = rate * 100;
    var fill = container.querySelector('[data-rate-fill="' + hospital + '"]');
    var track = container.querySelector('[data-rate-track="' + hospital + '"]');

    fill.style.width = Math.max(0, Math.min(100, percentValue)) + "%";
    track.setAttribute("aria-valuenow", percentValue.toFixed(2));
    container.querySelector('[data-rate-value="' + hospital + '"]').textContent = percent(rate);
  }

  function updateResult(container, rateA, rateB) {
    var winnerLabel = container.querySelector("[data-winner]");
    var gapLabel = container.querySelector("[data-gap]");
    var difference = rateA - rateB;

    if (Math.abs(difference) < 1e-10) {
      winnerLabel.textContent = "Rates are equal";
      gapLabel.textContent = "0.00 pp";
      return;
    }

    var winner = difference > 0 ? "A" : "B";
    winnerLabel.textContent = "Hospital " + winner + " leads";
    gapLabel.textContent = formatPercent.format(Math.abs(difference) * 100) + " pp";
  }

  function initializeSeparate(container) {
    var sliders = {
      a: container.querySelector('[data-mild-slider="a"]'),
      b: container.querySelector('[data-mild-slider="b"]')
    };

    function render() {
      var mildA = Number(sliders.a.value) / 100;
      var mildB = Number(sliders.b.value) / 100;
      var rateA = mildA * 0.90 + (1 - mildA) * 0.10;
      var rateB = mildB * 0.95 + (1 - mildB) * 0.30;

      ["a", "b"].forEach(function (hospital) {
        var mild = hospital === "a" ? mildA : mildB;
        container.querySelector('[data-mild-value="' + hospital + '"]').textContent = Math.round(mild * 100) + "%";
        updateMix(container, hospital, mild, "Hospital " + hospital.toUpperCase());
      });
      updateRate(container, "a", rateA);
      updateRate(container, "b", rateB);
      updateResult(container, rateA, rateB);
    }

    sliders.a.addEventListener("input", render);
    sliders.b.addEventListener("input", render);
    container.querySelector("[data-reset-mixes]").addEventListener("click", function () {
      sliders.a.value = "90";
      sliders.b.value = "20";
      render();
      sliders.a.focus();
    });
    render();
  }

  function initializeShared(container) {
    var slider = container.querySelector("[data-shared-slider]");

    function render() {
      var mild = Number(slider.value) / 100;
      var severe = 1 - mild;
      var rateA = mild * 0.90 + severe * 0.10;
      var rateB = mild * 0.95 + severe * 0.30;

      container.querySelector("[data-shared-value]").textContent = Math.round(mild * 100) + "% mild";
      updateMix(container, "shared", mild, "Shared standardized population");
      updateRate(container, "a", rateA);
      updateRate(container, "b", rateB);
      updateResult(container, rateA, rateB, mild);
    }

    slider.addEventListener("input", render);
    render();
  }

  document.querySelectorAll("[data-simpsons-demo]").forEach(function (container) {
    if (container.dataset.simpsonsInitialized === "true") {
      return;
    }
    container.dataset.simpsonsInitialized = "true";

    if (container.dataset.simpsonsDemo === "separate") {
      initializeSeparate(container);
    } else if (container.dataset.simpsonsDemo === "shared") {
      initializeShared(container);
    }
  });
}());
