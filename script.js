document.addEventListener("DOMContentLoaded", function () {
  const ageForm = document.getElementById("ageForm");
  const dayInput = document.getElementById("day");
  const monthInput = document.getElementById("month");
  const yearInput = document.getElementById("year");
  const resultDiv = document.getElementById("result");

  ageForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const dayValue = dayInput.value;
    const monthValue = monthInput.value;
    const yearValue = yearInput.value;

    if (!dayValue || !monthValue || !yearValue) {
      resultDiv.innerHTML =
        '<div style="color: #f56565;">Please enter a valid date.</div>';
      resultDiv.style.opacity = "1";
      return;
    }

    const birthdate = new Date(yearValue, monthValue - 1, dayValue);

    if (isNaN(birthdate.getTime())) {
      resultDiv.innerHTML =
        '<div style="color: #f56565;">Invalid date format.</div>';
      resultDiv.style.opacity = "1";
      return;
    }

    const today = new Date();
    let years = today.getFullYear() - birthdate.getFullYear();
    let months = today.getMonth() - birthdate.getMonth();
    let days = today.getDate() - birthdate.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate next birthday
    const nextBirthday = new Date(
      today.getFullYear(),
      birthdate.getMonth(),
      birthdate.getDate()
    );
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const daysUntilNextBirthday = Math.ceil(
      (nextBirthday - today) / (1000 * 60 * 60 * 24)
    );

    // Countdown timer animation
    const countdown = document.createElement("div");
    countdown.className = "countdown";
    countdown.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; margin-top: 20px;">
        <div style="display: flex; align-items: baseline; margin-bottom: 10px;">
          <span style="font-size: 2rem; font-weight: bold; color: #4A5568;">${daysUntilNextBirthday}</span>
          <span style="font-size: 1rem; margin-left: 5px; color: #4A5568;">days</span>
        </div>
        <div style="height: 5px; background: #68D391; width: 0; transition: width 1s;" class="countdown-bar"></div>
      </div>
    `;

    resultDiv.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; color: #5a67d8;">
        <div style="font-size: 2rem;">${years}</div> 
        <div style="margin-left: 0.5rem;">years</div>
      </div>
      <div style="display: flex; justify-content: center; align-items: center; margin-top: 0.5rem; color: #5a67d8;">
        <div style="font-size: 2rem;">${months}</div> 
        <div style="margin-left: 0.5rem;">months</div>
      </div>
      <div style="display: flex; justify-content: center; align-items: center; margin-top: 0.5rem; color: #5a67d8;">
        <div style="font-size: 2rem;">${days}</div> 
        <div style="margin-left: 0.5rem;">days</div>
      </div>
      <div style="padding: 1rem; background: #f0fff4; border: 1px solid #c6f6d5; border-radius: 0.5rem; box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1); color: #38a169; margin-top: 1.5rem;">
        <h2 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem;">Days Until Next Birthday:</h2>
        ${countdown.outerHTML}
      </div>
    `;
    resultDiv.style.opacity = "1";

    // Animate countdown bar
    setTimeout(() => {
      document.querySelector(".countdown-bar").style.width = "100%";
    }, 100);
  });
});
