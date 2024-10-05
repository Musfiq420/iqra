
import MCQ from "@/app/student/[course]/[node]/components/mcq";

export const configQuiz = {
  
  components: {
    MCQ: {
      fields: {
        instruction: {
          type: "textarea",
        },
        text: {
          type: "textarea",
        },
        explanation: {
          type: "textarea",
        },
        style: {
          type: "radio",
          options: [
            { label: "Dropdown", value: "dropdown" },
            { label: "MCQ(horizontal)", value: "mcqh" },
            { label: "MCQ(vertical)", value: "mcqv" },
            { label: "Fill in the Blanks", value: "fib" },
            { label: "Table", value: "table" },
            { label: "Word", value: "word" },
          ],
        }
      },
      defaultProps: {
        instruction: `## Question
&nbsp;
`,
        text: "This is a @cat:mouse@",
        explanation: "Because it is a cat.",
        style: "dropdown"
      },
      render: ({ instruction, text, explanation, style }) => {
        return <MCQ instruction={instruction} text={text} explanation={explanation} style={style} addMark={null} addTotal={null} />;
      },  
    }
  },
};

export const initialData = {
  content: [],
  root: {},
};