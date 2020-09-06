import React, {useLayoutEffect, useRef} from "react";
import Chart from "chart.js";
import "./sentimentBreakdown.css";

export default function ({annotations}) {
    const sentenceBySentenceBreakdown = useRef();
    const integratedSentiment = useRef();

    const {sentences} = annotations;

    useLayoutEffect(function () {
        const ctx = sentenceBySentenceBreakdown.current.getContext("2d");
        const gradient = ctx.createLinearGradient(
            sentenceBySentenceBreakdown.current.width / 2, 0,
            sentenceBySentenceBreakdown.current.width / 2, sentenceBySentenceBreakdown.current.height
        );
        gradient.addColorStop(0, "#6100caff");
        gradient.addColorStop(1, '#e000caff');
        const bgGradient = ctx.createLinearGradient(
            sentenceBySentenceBreakdown.current.width / 2, 0,
            sentenceBySentenceBreakdown.current.width / 2, sentenceBySentenceBreakdown.current.height
        );
        bgGradient.addColorStop(0, "#6100caaa");
        bgGradient.addColorStop(1, '#e000caaa');

        const sentenceBySentenceData = {
            labels: sentences.map(sentence => sentence.text.content),
            datasets: [
                {
                    data: sentences.map(sentence => sentence.sentiment.score),
                    label: "Sentiment broken down by sentence",
                    backgroundColor: bgGradient,
                    borderColor: gradient,
                    pointBorderColor: gradient,
                    pointBackgroundColor: gradient
                }
            ]
        };

        const integratedSentimentData = {
            labels: sentences.map(sentence => sentence.text.content),
            datasets: [
                {
                    data: sentences.map((_, i) => sentences.slice(0, i).reduce((acc, cur) => {
                        return Math.min(acc + cur.sentiment.score * cur.sentiment.magnitude, Math.max(1, acc + 0.1))
                    }, 0)),
                    label: "Integrated Sentiment",
                    backgroundColor: bgGradient,
                    borderColor: gradient,
                    pointBorderColor: gradient,
                    pointBackgroundColor: gradient
                }
            ]
        };

        const options = {
            legend: {
                display: false
            },
            onClick(event, elements) {
                if (elements.length === 1) {
                    const {_index: index} = elements[0];
                    google.script.run
                        .setSelectionByOffset(sentences[index].text.beginOffset);
                    google.script.host.editor.focus();
                }
            },
            tooltips: {
                enabled: false
            },
            scales: {
                xAxes: [{
                    display: false
                }],
                yAxes: [{
                    ticks: {
                        suggestedMin: -1,
                        suggestedMax: 1
                    }
                }]
            }
        };

        new Chart(sentenceBySentenceBreakdown.current, {
            data: sentenceBySentenceData, options,
            type: "line"
        });

        new Chart(integratedSentiment.current, {
            data: integratedSentimentData, options,
            type: "line"
        });
    }, []);

    return (
        <>
            <h1>Sentiment Breakdown</h1>
            <p>Click on a point to go to that sentence</p>
            <h2>Individual (by sentence)</h2>
            <canvas ref={sentenceBySentenceBreakdown}/>
            <h2>Cumulative (by sentence)</h2>
            <canvas ref={integratedSentiment}/>
        </>
    )
}