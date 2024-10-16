import React, { useState } from 'react';

const AdaptiveQuizPage = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  
  const handleAnswerChange = (e) => {
    setSelectedAnswer(e.target.value);
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen">
      <h1 className="text-3xl mt-10">Quiz Question</h1>
      <p className="mt-2">What is the capital of France?</p>
      <div className="mt-4">
        <input type="radio" value="Paris" checked={selectedAnswer === 'Paris'} onChange={handleAnswerChange} />
        <label className="ml-2">Paris</label>
        <br />
        <input type="radio" value="London" checked={selectedAnswer === 'London'} onChange={handleAnswerChange} />
        <label className="ml-2">London</label>
      </div>
      <div className="mt-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Next</button>
        <button className="bg-green-600 text-white px-4 py-2 rounded ml-2">Submit</button>
      </div>
    </div>
  );
};

export default AdaptiveQuizPage;

