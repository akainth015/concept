import React, {useEffect, useState} from "react";
import "./loading.css";
import "./main.css";
import DocumentSentiment from "./components/documentSentiment/DocumentOverview";
import SentimentBreakdown from "./components/sentimentBreakdown/SentimentBreakdown";
import SyntaxAnalysis from "./components/syntaxAnalysis/SyntaxAnalysis";

export default function () {
    const [annotations, setAnnotations] = useState(null);

    useEffect(() => {
        google.script.run
            .withSuccessHandler(setAnnotations)
            .withFailureHandler(console.error)
            .runAnalysis();
    }, []);

    if (annotations === null) {
        return (
            <div className="loading-container">
                <img src="https://concept.akainth.me/assets/concept.png" alt="Loading"/>
            </div>
        );
    } else {
        return (
            <>
                <DocumentSentiment annotations={annotations}/>
                <SentimentBreakdown annotations={annotations}/>
                <SyntaxAnalysis annotations={annotations}/>
            </>
        )
    }
}