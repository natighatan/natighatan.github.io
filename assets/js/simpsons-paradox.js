(function () {
  "use strict";

  var formatPercent = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  function percent(value) {
    return formatPercent.format(value * 100) + "%";
  }

  function percentagePoints(value) {
    return formatPercent.format(value * 100) + " percentage points";
  }

  function updateMix(container, hospital, mildShare) {
    var mildPercent = Math.round(mildShare * 100);
    var severePercent = 100 - mildPercent;
    var mildFill = container.querySelector('[data-mild-fill="' + hospital + '"]');
    var severeFill = container.querySelector('[data-severe-fill="' + hospital + '"]');
    var bar = container.querySelector('[data-mix-bar="' + hospital + '"]');
    var label = container.querySelector('[data-mix-label="' + hospital + '"]');

    mildFill.style.width = mildPercent + "%";
    severeFill.style.width = severePercent + "%";
    bar.setAttribute("aria-label", "" + (container.dataset.simpsonsDemo === "shared" ? "Shared population for " : "") + "Hospital " + hospital.toUpperCase() + ": " + mildPercent + "% mild cases and " + severePercent + "% severe cases");
    label.textContent = mildPercent + "% mild · " + severePercent + "% severe";
  }

  function updateRate(container, hospital, rate) {
    var percentValue = rate * 100;
    var fill = container.querySelector('[data-rate-fill="' + hospital + '"]');
    var track = container.querySelector('[data-rate-track="' + hospital + '"]');

    fill.style.width = Math.max(0, Math.min(100, percentValue)) + "%";
    track.setAttribute("aria-valuenow", percentValue.toFixed(2));
    container.querySelector('[data-rate-value="' + hospital + '"]').textContent = percent(rate);
  }

  function updateResult(container, rateA, rateB, sharedShare) {
    var result = container.querySelector("[data-result]");
    var difference = rateA - rateB;

    if (Math.abs(difference) < 1e-10) {
      result.textContent = "At these patient mixes, the modeled overall success rates are equal.";
      return;
    }

    var winner = difference > 0 ? "A" : "B";
    var gap = percentagePoints(Math.abs(difference));
    if (container.dataset.simpsonsDemo === "shared") {
      result.textContent = "With the same " + Math.round(sharedShare * 100) + "/" + (100 - Math.round(sharedShare * 100)) + " mild/severe patient mix, Hospital " + winner + "'s modeled overall rate is higher by " + gap + ".";
    } else {
      result.textContent = "At these patient mixes, Hospital " + winner + " has a higher modeled overall rate by " + gap + ".";
    }
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
        updateMix(container, hospital, mild);
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

      container.querySelector("[data-shared-value]").textContent = Math.round(mild * 100) + "%";
      ["a", "b"].forEach(function (hospital) {
        updateMix(container, hospital, mild);
      });
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
