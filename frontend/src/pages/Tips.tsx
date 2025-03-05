import { Container, Divider, List, ListItem, Typography } from "@mui/material";
import React from "react";

const Tips = () => {
  const tips = [
    {
      text: "If input array is sorted then",
      items: ["Binary search", "Two pointers"],
    },
    {
      text: "If asked for all permutations/subsets then",
      items: ["Backtracking"],
    },
    {
      text: "If given a tree or graph then",
      items: [
        "Depth First Search (DFS)",
        "Breadth First Search (BFS)",
        "Multi-Source BFS",
        "Union Find",
      ],
    },
    {
      text: "If given a shortest distance question",
      items: [
        "BFS if weights are all one",
        "Dijkstra if weights are not all one",
      ],
    },
    {
      text: "If given a linked list then",
      items: [
        "Two pointers: slow and fast (Tortoise and Hare)",
        "Dummy node to handle first node edge case",
      ],
    },
    { text: "If recursion is banned then", items: ["Stack"] },
    { text: "If cloning then", items: ["Hash Map"] },
    {
      text: "If must solve in-place then",
      items: [
        "Swap corresponding values",
        "Store one or more different values in the same pointer",
      ],
    },
    {
      text: "If asked for maximum/minimum subarray/subset/options then",
      items: ["Dynamic Programming (DP)"],
    },
    {
      text: "If asked for top/least K items then",
      items: ["Heap", "Quick Select"],
    },
    { text: "If asked for common strings then", items: ["Hash Map", "Trie"] },
    {
      text: "If asked a bit manipulation question then",
      items: ["XOR might be useful"],
    },
    {
      text: "Else",
      items: [
        "Hash Map/Set to trade linear space for constant time lookup",
        "Heap Sort to solve in logarithmic time and constant space",
      ],
    },
  ];

  return (
    <Container maxWidth="sm">
      <List
        sx={{ border: "2px solid", borderColor: "divider", borderRadius: 5 }}
      >
        {tips.map((tip, index) => (
          <React.Fragment key={index}>
            <ListItem
              sx={{
                backgroundColor: index % 2 === 1 ? "lightgrey" : "inherit",
              }}
            >
              <Typography variant="body1">
                {tip.text}
                <ul>
                  {tip.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </Typography>
            </ListItem>
            {index < 12 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
};

export default Tips;
