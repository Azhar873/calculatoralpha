import { useMemo, useState } from "react";
import { Calculator, ImagePlus, LoaderCircle, RefreshCw, Sparkles } from "lucide-react";
import SEO from "../components/SEO/SEO";
import { analyzeCalculatorScreenshot } from "../services/screenshotCalculatorApi";
import { generateCalculatorSchema, getSEOData, seoConfig } from "../utils/seo-config";
import "./ScreenshotCalculatorPage.css";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

function getCorrectOption(calculator) {
  if (!calculator?.options?.length) return null;

  const answerText = (calculator.correctAnswer || "").trim();
  const normalizedAnswer = answerText.toLowerCase();

  return (
    calculator.options.find((option) => {
      const label = (option.label || "").toLowerCase();
      const text = (option.text || "").toLowerCase();
      return (
        normalizedAnswer === label ||
        normalizedAnswer === `${label}) ${text}` ||
        normalizedAnswer.includes(label) ||
        normalizedAnswer.includes(text) ||
        text.includes(normalizedAnswer)
      );
    }) ||
    calculator.options.find((option) => option.label.toLowerCase() === normalizedAnswer.slice(0, 1)) ||
    calculator.options[0]
  );
}

function calculateResult(formula, fields) {
  if (!formula) return null;
  const names = fields.map((field) => field.id);
  const values = fields.map((field) => Number(field.value) || 0);
  const expression = formula.replace(/\^/g, "**");
  if (!/^[a-zA-Z0-9_+\-*/().\s*]+$/.test(expression)) return null;

  try {
    const result = Function(...names, `"use strict"; return (${expression});`)(...values);
    return Number.isFinite(result) ? result : null;
  } catch {
    return null;
  }
}

function ScreenshotCalculatorPage() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [calculator, setCalculator] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");

  const seoData = getSEOData("screenshot-calculator");
  const schema = generateCalculatorSchema(
    "AI Screenshot Calculator",
    seoData.description,
    `${seoConfig.siteUrl}/screenshot-calculator`,
  );

  const result = useMemo(
    () => calculateResult(calculator?.formula, calculator?.fields || []),
    [calculator],
  );

  const correctOption = useMemo(
    () => getCorrectOption(calculator),
    [calculator],
  );

  const correctAnswerText = useMemo(() => {
    if (!calculator) return "Not determined";
    if (correctOption) {
      return `${correctOption.label.toUpperCase()}) ${correctOption.text}`;
    }
    return calculator.correctAnswer || "Not determined";
  }, [calculator, correctOption]);

  const handleFile = (event) => {
    const selectedFile = event.target.files?.[0];
    acceptFile(selectedFile);
  };

  const acceptFile = (selectedFile) => {
    if (!selectedFile) return;
    setError("");
    setCalculator(null);

    if (!selectedFile.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("Image must be smaller than 10 MB.");
      return;
    }

    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const analyzeScreenshot = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    setError("");
    try {
      const data = await analyzeCalculatorScreenshot(file);
      setCalculator(data);
    } catch (analysisError) {
      setError(analysisError.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const updateField = (id, value) => {
    setCalculator((current) => ({
      ...current,
      fields: current.fields.map((field) =>
        field.id === id ? { ...field, value } : field,
      ),
    }));
  };

  const reset = () => {
    setFile(null);
    setPreviewUrl("");
    setCalculator(null);
    setError("");
  };

  return (
    <div className="screenshot-calculator-page">
      <SEO
        pageKey="screenshot-calculator"
        schemaData={schema}
      />
      <div className="screenshot-shell container">
        <section className="screenshot-intro">
          <span className="eyebrow"><Sparkles size={15} /> AI-powered tool</span>
          <h1>Upload an image. Get the answer.</h1>
          <p>Groq Vision reads math questions, number patterns and multiple-choice puzzles, then explains the correct answer.</p>
        </section>

        <div className="screenshot-grid">
          <section className="upload-panel">
            <div className="panel-heading">
              <div className="heading-icon"><ImagePlus size={22} /></div>
              <div><h2>Upload screenshot</h2><p>PNG, JPG or WEBP up to 10 MB</p></div>
            </div>
            <label className="dropzone" htmlFor="calculator-screenshot" onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); acceptFile(event.dataTransfer.files?.[0]); }}>
              {previewUrl ? <img src={previewUrl} alt="Selected calculator screenshot" /> : <><ImagePlus size={38} /><strong>Choose an image</strong><span>or drop it here</span></>}
            </label>
            <input id="calculator-screenshot" type="file" accept="image/png,image/jpeg,image/webp" onChange={handleFile} />
            <div className="upload-actions">
              <button className="primary-button" type="button" onClick={analyzeScreenshot} disabled={!file || isAnalyzing}>
                {isAnalyzing ? <><LoaderCircle className="spin" size={18} /> Solving image...</> : <><Sparkles size={18} /> Analyze image</>}
              </button>
              {(file || calculator) && <button className="icon-button" type="button" onClick={reset} aria-label="Start over" title="Start over"><RefreshCw size={18} /></button>}
            </div>
            {error && <p className="error-message" role="alert">{error}</p>}
          </section>

          <section className="result-panel">
            {!calculator ? <div className="empty-result"><Calculator size={34} /><h2>Your answer appears here</h2><p>The question, answer or calculator result will be generated after analysis.</p></div> : calculator.type === "mcq" ? <>
              <div className="result-heading"><div><span className="eyebrow">Solved from screenshot</span><h2>{calculator.title}</h2></div><span className="review-pill">Answer found</span></div>
              {calculator.description && <p className="result-description">{calculator.description}</p>}
              <div className="question-box"><span>Question</span><strong>{calculator.question || "Math question"}</strong></div>
              <div className="option-list">{calculator.options.map((option) => {
                const isCorrect = correctOption ? option.label === correctOption.label : calculator.correctAnswer.toLowerCase().startsWith(option.label.toLowerCase());
                return <div key={`${option.label}-${option.text}`} className={isCorrect ? "option correct-option" : "option"}><b>{option.label})</b><span>{option.text}</span>{isCorrect && <em>Correct</em>}</div>;
              })}</div>
              <div className="answer-box"><span>Correct answer</span><strong>{correctAnswerText}</strong></div>
              {calculator.explanation && <div className="explanation-box"><strong>Solution</strong><p>{calculator.explanation}</p></div>}
            </> : <>
              <div className="result-heading"><div><span className="eyebrow">Generated draft</span><h2>{calculator.title}</h2></div><span className="review-pill">Review inputs</span></div>
              {calculator.description && <p className="result-description">{calculator.description}</p>}
              <div className="field-list">
                {calculator.fields.map((field) => <label key={field.id}>{field.label}<span>{field.unit || "Number"}</span><input type="number" value={field.value} onChange={(event) => updateField(field.id, event.target.value)} /></label>)}
              </div>
              <div className="answer-box"><span>{calculator.resultLabel || "Result"}</span><strong>{result === null ? "Check formula" : result.toLocaleString(undefined, { maximumFractionDigits: 6 })}</strong></div>
              <p className="formula-note">Formula: <code>{calculator.formula}</code></p>
            </>}
          </section>
        </div>
      </div>
    </div>
  );
}

export default ScreenshotCalculatorPage;
