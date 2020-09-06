import React from "react";
import * as THRESHOLDS from "../../thresholds";
import "./documentOverview.css";

export default function ({annotations}) {
    const {score, magnitude} = annotations.documentSentiment;
    const {categories, entities, tokens} = annotations;

    const normalizedMagnitude = (magnitude / tokens.length).toFixed(3);

    const categoriesList = categories.map(({name: category}) => {
        const parts = category.split("/");
        const categoryName = parts[parts.length - 1];
        return <li key={category}>{categoryName}</li>;
    });

    const categoriesSection =
        <ul id="categories">
            {categoriesList}
        </ul>;

    const pluralizedItems = entities.length === 1 ? "item" : "items";
    const entitiesList = entities
        .slice(0, 5)
        .map((entity, i) => {
            return <li key={i}>{entity.name}</li>
        });

    return (
        <>
            <h1>{"<?= DocumentApp.getActiveDocument().getName() ?>"}</h1>
            {categories && categoriesSection}
            <p>Your writing is <strong>{THRESHOLDS.getStringForScore(score, normalizedMagnitude).toLowerCase()}</strong>
            </p>
            <p>The most relevant {pluralizedItems} in this document are:</p>
            <ol>
                {entitiesList}
            </ol>
        </>
    );
}