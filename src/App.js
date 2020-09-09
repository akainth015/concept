import React, {useEffect, useState} from "react";
import "./loading.css";
import "./main.css";
import DocumentSentiment from "./components/documentSentiment/DocumentOverview";
import SentimentBreakdown from "./components/sentimentBreakdown/SentimentBreakdown";
import SyntaxAnalysis from "./components/syntaxAnalysis/SyntaxAnalysis";

export default function () {
    const [annotations, setAnnotations] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let successHandler = async function ([payload, headers]) {
            const response = await fetch("https://language.googleapis.com/v1/documents:annotateText", {
                method: "POST",
                body: JSON.stringify(payload),
                headers: headers,
            });
            if (response.status !== 200) {
                setError(response.text());
            }
            setAnnotations(await response.json());
        };

        google.script.run
            .withSuccessHandler(successHandler)
            .withFailureHandler(console.error)
            .createAnnotationRequest();
    }, []);

    if (error !== null) {
        console.error(e);
        return (
            <div>
                <h1>Error</h1>
                <h2>{JSON.stringify(error)}</h2>
            </div>
        )
    } else if (annotations === null) {
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