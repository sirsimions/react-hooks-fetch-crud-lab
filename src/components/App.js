import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);
  const url = "http://localhost:4000/questions";

  useEffect(fetchQuestions,[]);

  function fetchQuestions() {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }

  function onAddQuestion(question) {
    setQuestions([...questions, question]);
  }

  function deleteQuestion(questionToDelete) {
    const deleteUrl = `${url}/${questionToDelete.id}`;
    fetch(deleteUrl, { method: "DELETE"})
      .then(response => response.json())
      
    const updatedQuestions = questions.filter(question => question.id !== questionToDelete.id);
    setQuestions(updatedQuestions);
  }

  function updateQuestion(updatedQuestion) {
    const updatedQuestions = questions.map(question => {
      if(question.id === updatedQuestion.id) {
        return updatedQuestion
      }
      else {
        return question;
      }
    } );
    setQuestions(updatedQuestions);
    // patch.
    const questionUrl = getQuestionUrl(updatedQuestion.id);
    const settings = {
      method: "PATCH",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({ correctIndex: updatedQuestion.correctIndex})
    }
    fetch(questionUrl, settings)
  }

  function getQuestionUrl(id) {
    return `${url}/${id}`;
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm url={url} onAddQuestion={onAddQuestion}/> : <QuestionList questions={questions} onDeleteQuestion={deleteQuestion} onSelectionChange={updateQuestion} />}
    </main>
  );
}

export default App;