import { Button, Textarea } from "@strapi/design-system";
import React, { useEffect, useState } from "react";
import { useCMEditViewDataManager  } from '@strapi/helper-plugin';

export default function GenerateSummaryControl({
                                                 name,
                                                 error,
                                                 description,
                                                 onChange,
                                                 value,
                                                 intlLabel,
                                                 attribute,
                                                 props
                                               }: {
  name: string,
  error: string,
  description: string,
  onChange: any,
  value: any,
  intlLabel: string,
  attribute: any,
  props: any
}) {

  const [jwtToken, setJwtToken] = useState("");
  const [loading, setLoading] = useState(false);
  const { modifiedData } = useCMEditViewDataManager();
  useEffect(() => {
    console.log(modifiedData);
  }, [modifiedData]);

  useEffect(() => {
    const sessionToken = sessionStorage.getItem("jwtToken");
    if (sessionToken) {
      const token = sessionToken.slice(1, sessionToken.length - 1);
      if (token) {
        setJwtToken(token);
      }
    }
  }, [sessionStorage]);

  const handleGenerateSummary = async () => {
    console.log("hello x2")
    setLoading(true);
    const text = modifiedData.content;
    if (text === "") {
      setLoading(false);
      return;
    }

    // call api
    const response = await fetch(`/generate-ai-content-summary/generate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwtToken}`
        },
        body: JSON.stringify({
          text: text
        })
      });

    if (!response.ok) {
      setLoading(false);
      return;
    }

    const result = await response.json();
    onChange({ target: { name, value: result.data, type: attribute.type } })
    // setSummary(result.data);
    setLoading(false);
  };

  return (
    <div>
      <span style={{
        fontSize: '12px',
        fontWeight: 'bold',
      }}>Generated summary</span>
      <Textarea
        placeholder={"Generated summary"}
        label={"Content"}
        name={"content-summary"}
        value={value}
        onChange={(e: any) =>
          onChange({
            target: { name, value: e.target.value, type: attribute.type },
          })
        }
      >
      </Textarea>
      <Button
        loading={loading}
        disabled={loading}
        onClick={() => handleGenerateSummary()}>
        Generate
        Summary</Button>
    </div>
  );
}
