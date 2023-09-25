import Match from '../models/Match.js';

export async function createMatch(req, res) {
    try {
        const { matchId, awayTeam, homeTeam, date, moneyLineOdds, overUnderOdds, spread } = req.body;

        const newMatch = await Match.create({
            matchId,
            awayTeam,
            homeTeam,
            date,
            moneyLineOdds,
            overUnderOdds,
            spread,
        });

        await newMatch.save();
        res.json(newMatch);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while creating the match.' });
    }
}