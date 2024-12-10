import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/AddQuestion.css';

const AddQuestion = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '']);
    const [correctOption, setCorrectOption] = useState('');
    const [mark, setMark] = useState('');
    const [negativeMark, setNegativeMark] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const [questionsList, setQuestionsList] = useState([]);
    const [activeQuestion, setActiveQuestion] = useState(null);

    const navigate = useNavigate();

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const addOption = () => {
        setOptions([...options, '']);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8000/staff/addquestion/', {
                question,
                options,
                correctOption,
                mark,
                negativeMark,
            });

            if (response.status === 200) {
                setSuccessMessage('Question added successfully!');
                setError(null);
                const savedQuestions = JSON.parse(sessionStorage.getItem('questions')) || [];
                const newQuestion = { question, options, correctOption, mark, negativeMark };
                savedQuestions.push(newQuestion);
                sessionStorage.setItem('questions', JSON.stringify(savedQuestions));
                setQuestionsList([...savedQuestions]);
                navigate('/addquestion');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to add question. Please try again.');
            setSuccessMessage('');
        } finally {
            setLoading(false);
        }
    };

    const handleGridTileClick = (index) => {
        setActiveQuestion(questionsList[index]);
    };

    const handleNext = () => {
        setQuestion('');
        setOptions(['', '', '']);
        setCorrectOption('');
        setMark('');
        setNegativeMark('');
        setSuccessMessage('');
        setError('');
    };

    return (
        <div className="mainContainer">
            {/* Left Grid View */}
            <div className="gridContainer">
                <h2 className="gridHeading">Questions</h2>
                {questionsList.map((item, index) => (
                    <div
                        key={index}
                        className={`gridTile ${activeQuestion === item ? 'activeTile' : ''}`}
                        onClick={() => handleGridTileClick(index)}
                    >
                        {`Q${index + 1}`}
                    </div>
                ))}
            </div>

            {/* Right Form View */}
            <div className="formContainer">
                <h1 className="heading">Add Question</h1>
                <div className="formGroup">
                    <label className="label">Question*</label>
                    <textarea
                        className="textarea"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Enter your question here"
                    />
                </div>

                <div className="formGroup">
                    <label className="label">Options*</label>
                    {options.map((option, index) => (
                        <input
                            key={index}
                            className="input"
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            placeholder={`Option ${index + 1}`}
                        />
                    ))}
                    <button className="button primaryButton" onClick={addOption}>
                        Add Option
                    </button>
                </div>

                <div className="formGroup">
                    <label className="label">Correct Option*</label>
                    <input
                        className="input"
                        type="text"
                        value={correctOption}
                        onChange={(e) => setCorrectOption(e.target.value)}
                        placeholder="Enter the correct option"
                    />
                </div>

                <div className="formGroup">
                    <label className="label">Mark*</label>
                    <input
                        className="input"
                        type="text"
                        value={mark}
                        onChange={(e) => setMark(e.target.value)}
                        placeholder="Enter marks for the question"
                    />
                </div>

                <div className="formGroup">
                    <label className="label">Negative Mark*</label>
                    <input
                        className="input"
                        type="text"
                        value={negativeMark}
                        onChange={(e) => setNegativeMark(e.target.value)}
                        placeholder="Enter negative marks for the question"
                    />
                </div>

                {loading && <p>Submitting...</p>}
                {successMessage && <p className="message successMessage">{successMessage}</p>}
                {error && <p className="message errorMessage">{error}</p>}

                <div className="formActions">
                    <button className="button primaryButton" onClick={handleSubmit}>
                        Submit
                    </button>
                    <button className="button primaryButton" onClick={handleNext}>
                        Next
                    </button>
                    <button className="button secondaryButton" onClick={() => navigate('/staffhome')}>
                        Back
                    </button>
                </div>

                {activeQuestion && (
                    <div className="selectedQuestion">
                        <h3>Selected Question Details:</h3>
                        <p><strong>Question:</strong> {activeQuestion.question}</p>
                        <p><strong>Options:</strong> {activeQuestion.options.join(', ')}</p>
                        <p><strong>Correct Option:</strong> {activeQuestion.correctOption}</p>
                        <p><strong>Mark:</strong> {activeQuestion.mark}</p>
                        <p><strong>Negative Mark:</strong> {activeQuestion.negativeMark}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddQuestion;
