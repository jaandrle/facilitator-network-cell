export default function getPresentation() {
	return {
		day: 1,
		sessions: {
			1: { from: "1", to: "3", title: "Session 1", games: ["1"] },
			2: { from: "4", to: "8", title: "Session 1", games: ["1", "3"] },
			3: { from: "9", to: "13", title: "Session 2", games: ["1", "2"] },
			4: { from: "14", to: "18", title: "Session 3", games: ["3", "2"] },
		},
	};
}
