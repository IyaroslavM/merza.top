import React from 'react';

export function ProjectCards({ projects }) {
  const [visible, setVisible] = React.useState([]);
  React.useEffect(() => {
    setVisible([]);
    const ids = projects.map((_, i) =>
      setTimeout(() => setVisible(v => [...v, i]), 120 + i * 110)
    );
    return () => ids.forEach(clearTimeout);
  }, []);
  return (
    <div className="projects">
      {projects.map((p, i) => (
        <div key={i} className={"pcard" + (visible.includes(i) ? " visible" : "")}
             style={{ transitionDelay: `${i * 0.08}s` }}>
          [ {p} ]
        </div>
      ))}
    </div>
  );
}
