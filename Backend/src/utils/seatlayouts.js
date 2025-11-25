export const SEAT_LAYOUTS = {

  // 40-Seater Bus (2x2 layout)
  seater_40: {
    type: "seater",
    rows: [
      ["A1", "A2", "A3", "A4"],
      ["B1", "B2", "B3", "B4"],
      ["C1", "C2", "C3", "C4"],
      ["D1", "D2", "D3", "D4"],
      ["E1", "E2", "E3", "E4"],
      ["F1", "F2", "F3", "F4"],
      ["G1", "G2", "G3", "G4"],
      ["H1", "H2", "H3", "H4"],
      ["I1", "I2", "I3", "I4"],
      ["J1", "J2", "J3", "J4"]
    ]
  },

  // Sleeper Bus (32 Berths)
  sleeper_32: {
    type: "sleeper",
    lower: [
      "L1","L2","L3","L4","L5","L6","L7","L8",
      "L9","L10","L11","L12","L13","L14","L15","L16"
    ],
    upper: [
      "U1","U2","U3","U4","U5","U6","U7","U8",
      "U9","U10","U11","U12","U13","U14","U15","U16"
    ]
  }

};
