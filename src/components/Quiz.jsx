import { useState, useEffect } from 'react';
import questions from '../questions.json';

const Quiz = () => {
  const [start, setStart] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);

  // ✅ التقييم حسب السكور
  const getRating = () => {
    const percent = (score / questions.length) * 100;
    if (percent === 100) return 'ممتاز 👑';
    if (percent >= 70) return 'جيد جدًا 💪';
    if (percent >= 50) return 'جيد 🙂';
    return 'محتاج تراجع شوية 😅';
  };

  // ✅ تايمر
  useEffect(() => {
    if (!start || showResult) return;

    if (timeLeft === 0) {
      handleAnswer(false);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, start, showResult]);

  // ✅ إعادة التايمر عند تغيير السؤال
  useEffect(() => {
    setTimeLeft(15);
  }, [currentIndex]);

  const handleAnswer = (correct) => {
    if (correct) setScore(score + 1);

    const next = currentIndex + 1;
    if (next < questions.length) {
      setCurrentIndex(next);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setStart(false);
    setTimeLeft(15);
  };

  if (!start) {
    return (
      <div>
        <h2>جاهز تبدأ؟</h2>
        <button onClick={() => setStart(true)}>ابدأ الكويز</button>
      </div>
    );
  }

  if (showResult) {
    return (
      <div>
        <h2>النتيجة: {score} من {questions.length}</h2>
        <p>{getRating()}</p>
        <button onClick={handleRestart}>إعادة الكويز 🔁</button>
      </div>
    );
  }

  return (
    <div>
      {/* Progress Bar */}
      <div className="progress-container">
        <div
          className="progress-bar"
          style={{
            width: `${((currentIndex + 1) / questions.length) * 100}%`
          }}
        ></div>
      </div>

      <h2>{questions[currentIndex].question}</h2>
      <p>الوقت المتبقي: {timeLeft} ثانية</p>
      <div>
        {questions[currentIndex].answers.map((answer, idx) => (
          <button key={idx} onClick={() => handleAnswer(answer.correct)}>
            {answer.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
