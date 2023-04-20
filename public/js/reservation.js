const newFormHandler = async (event) => {
  event.preventDefault();

  const party_number = document.querySelector("#party_number").value.trim();
  const time = document.querySelector("#time").value.trim();
  const restaurant_id = document.querySelector("#restaurant_id").value.trim();

  if (party_number && time && restaurant_id) {
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
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/projects/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete project");
    }
  }
};

document
  .querySelector(".new-project-form")
  .addEventListener("submit", newFormHandler);

document
  .querySelector(".project-list")
  .addEventListener("click", delButtonHandler);
