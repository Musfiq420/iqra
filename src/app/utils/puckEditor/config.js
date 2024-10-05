import Accordion from "@/app/student/[course]/[node]/components/accordion";
import IFrame from "@/app/student/[course]/[node]/components/iframe";
import ImageHotspot from "@/app/student/[course]/[node]/components/image_hotspot";
import MCQ from "@/app/student/[course]/[node]/components/mcq";
import TabbedView from "@/app/student/[course]/[node]/components/tabbedView";




const { default: MdText } = require("../mdText");

export const config = {
  
  components: {
    Markdown: {
      fields: {
        text: {
          type: "textarea",
        },
      },
      defaultProps: {
        text: `## title
&nbsp;

body`,
      },
      render: ({ text }) => {
        return <div style={{ backgroundColor:"#fffffc", padding:'5px', paddingLeft:"20px"}}>  
        {/* <p style={{opacity:0.4, fontSize:12, paddingBottom:'5px'}}>Concept</p> */}
        <MdText>{text}</MdText>
      </div>;
      },
      
    },
    IFrame: {
      fields: {
        instruction: {
          type: "textarea",
        },
        src: {
          type: "textarea",
        },
        height: {
          type: "number"
        },
        width: {
          type: "number"
        }
      },
      defaultProps: {
        text: "",
      },
      render: ({ instruction,src,height,width }) => {
        return <IFrame instruction={instruction} src={src} height={height} width={width} />;
      },
      
    },

    ImageHotspot: {
      fields: {
        text: {
          type: "textarea",
        },
        hotspots: {
          type: "array",
          arrayFields: {
            info: { type: "text" },
            top: {type: "number"},
            left: {type: "number"}
          },
        },
      },
      defaultProps: {
        text: "",
        hotspots: [],
      },
      render: ({ text, hotspots }) => {
        return <ImageHotspot text={text} hotspots={hotspots}  />;
      },
      
    },

    TabbedView: {
      fields: {
        text: {
          type: "textarea",
        },
        tabs: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
            body: {type: "text"}
          },
        },
      },
      defaultProps: {
        text: "Title",
        tabs: [
          { title: "Tab-1", body: "*This* is the content for Tab 1" },
          { title: "Tab-2", body: "This is the content for Tab 2" },
          { title: "Tab-3", body: "This is the content for Tab 3" },
        ],
      },
      render: ({ text, tabs }) => {
        return <TabbedView text={text} tabs={tabs}  />;
      },
      
    },

    Accordion: {
      fields: {
        sections: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
            body: {type: "text"}
          },
        },
      },
      defaultProps: {
        sections: [
          { title: "Tab-1", body: "*This* is the content for Tab 1" },
          { title: "Tab-2", body: "This is the content for Tab 2" },
          { title: "Tab-3", body: "This is the content for Tab 3" },
        ],
      },
      render: ({ sections }) => {
        return <Accordion data={sections}  />;
      },
      
    },
    
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