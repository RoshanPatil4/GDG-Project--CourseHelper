document.addEventListener("DOMContentLoaded", () => {
    const addCourseBtn = document.getElementById("add-course-btn");
    const courseModal = document.getElementById("course-modal");
    const closeCourseModal = document.getElementById("close-course-modal");
    const coursesContainer = document.getElementById("courses");
    const courseForm = document.getElementById("course-form");
    const modalTitle = document.getElementById("modal-title");
    const modalButtons = document.getElementById("modal-buttons");

    let editingCourse = null; // Track the course being edited

    // Show Add Course Modal
    addCourseBtn.addEventListener("click", () => {
        modalTitle.textContent = "Add Course";
        courseForm.reset();
        modalButtons.innerHTML = `<button type="submit" class="btn submit-btn">Submit</button>`;
        courseModal.classList.remove("hidden");
        editingCourse = null; // Clear editing state
    });


    // Close Modal
    closeCourseModal.addEventListener("click", () => {
        courseModal.classList.add("hidden");
    });

    // Submit Course Form
    courseForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("course-name").value;
        const code = document.getElementById("course-code").value;
        const description = document.getElementById("course-description").value;
        const credits = document.getElementById("course-credits").value;
        const imageUrl = document.getElementById("course-image").value;

        if (editingCourse) {
            // Update existing course
            editingCourse.querySelector("h3").textContent = name;
            editingCourse.querySelector("p").textContent = `Code: ${code}`;
            editingCourse.querySelector("p1").textContent = `Credits: ${credits}`;
            editingCourse.querySelector("img").src = imageUrl;
            // Update dataset attributes
            editingCourse.dataset.description = description;
            editingCourse.dataset.credits = credits; 
        } else {
            // Add new course
            const newCard = document.createElement("div");
            newCard.classList.add("course-card");
            newCard.dataset.description = description;
            newCard.dataset.credits = credits;
            newCard.innerHTML = `
                <img src="${imageUrl}" alt="Course Image">
                <h3>${name}</h3>
                <p>Code: ${code}</p>
                <p class="course-credits">Credits: ${credits}</p>
            `;
            coursesContainer.appendChild(newCard);
        }

        courseModal.classList.add("hidden");
    });

    // Open Edit/Delete Course Modal
    coursesContainer.addEventListener("click", (e) => {
        const card = e.target.closest(".course-card");
        if (card) {
            const name = card.querySelector("h3").textContent;
            const code = card.querySelector("p").textContent.split(": ")[1];
            const description = card.dataset.description || "";
            const credits = card.dataset.credits || "";
            const imageUrl = card.querySelector("img").src;

            modalTitle.textContent = "Course details";
            document.getElementById("course-name").value = name;
            document.getElementById("course-code").value = code;
            document.getElementById("course-description").value = description;
            document.getElementById("course-credits").value = credits;
            document.getElementById("course-image").value = imageUrl;

            modalButtons.innerHTML = `
                <button type="submit" class="btn update-btn">Update</button>
                <button type="button" class="btn delete-btn">Delete</button>
            `;

            courseModal.classList.remove("hidden");
            editingCourse = card;

            // Handle Delete
            modalButtons.querySelector(".delete-btn").addEventListener("click", () => {
                card.remove();
                courseModal.classList.add("hidden");
            });
        }
    });
});