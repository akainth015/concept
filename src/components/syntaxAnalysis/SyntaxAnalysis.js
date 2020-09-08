import React, {useLayoutEffect, useRef} from "react";
import {createBackgroundGradient, createStrokeGradient} from "../../colors";
import Chart from "chart.js";

export default function ({annotations}) {
    const {sentences} = annotations;

    const sentenceLengthCanvas = useRef();

    useLayoutEffect(() => {
        let ctx = sentenceLengthCanvas.current.getContext("2d");
        let gradient = createStrokeGradient(ctx);
        let bgGradient = createBackgroundGradient(ctx);

        const sentenceLengthData = {
            labels: sentences.map(sentence => sentence.text.content),
            datasets: [
                {
                    data: sentences.map(sentence => sentence.text.content.split(" ").length),
                    label: "Sentiment broken down by sentence",
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
                        .setSelectionByOffset(sentences[index].text.beginOffset, sentences[index].text.content);
                    google.script.host.editor.focus();
                }
            },
            tooltips: {
                enabled: false
            },
            scales: {
                xAxes: [{
                    display: false
                }]
            }
        }

        new Chart(sentenceLengthCanvas.current, {
            data: sentenceLengthData,
            options,
            type: "line"
        });
    });

    return (
        <>
            <h1>Syntax Analysis</h1>
            <h2>Sentence Lengths</h2>
            <canvas ref={sentenceLengthCanvas}/>
        </>
    )
}