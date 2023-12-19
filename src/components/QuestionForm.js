import React, { useState } from "react";

function QuestionForm(props) {
  const initialFormData = {
    prompt: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correctIndex: 0,
  };

  const [formData, setFormData] = useState(initialFormData);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: formData.prompt,
          answers: [
            formData.answer1,
            formData.answer2,
            formData.answer3,
            formData.answer4,
          ],
          correctIndex: parseInt(formData.correctIndex),
        }),
      });

      if (response.ok) {
        // Optionally reset the form after successful submission
        setFormData(initialFormData);
        // Add any other necessary logic after successful submission
      } else {
        // Handle error responses here
        throw new Error("Failed to add question");
      }
    } catch (error) {
      // Handle fetch errors or validation errors
      console.error("Error:", error.message);
    }
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
          />
        </label>
        {/* Input fields for answers */}
        <label>
          Answer 1:
          <input
            type="text"
            name="answer1"
            value={formData.answer1}
            onChange={handleChange}
          />
        </label>
        {/* Add similar input fields for answer2, answer3, and answer4 */}
        {/* ... */}
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            <option value="0">{formData.answer1}</option>
            {/* Add options for answer2, answer3, and answer4 */}
            {/* ... */}
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
