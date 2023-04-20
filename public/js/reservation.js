const newFormHandler = async (event) => {
  event.preventDefault();

  const party_number = document.querySelector("#party_number").value.trim();
  const time = document.querySelector("#time").value;
  const restaurant_id = document.querySelector("#restaurant_id").value.trim();

  const response = await fetch(`/api/reservation/`, {
    method: "POST",
    body: JSON.stringify({ party_number, time, restaurant_id }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/profile");
  } else {
    alert("Failed to create project");
  }
};

document
  .querySelector(".reservation-form")
  .addEventListener("submit", newFormHandler);
