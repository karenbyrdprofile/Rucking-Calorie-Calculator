import React, { useEffect } from 'react';

interface MetaTagsProps {
  title: string;
  description: string;
}

export const MetaTags: React.FC<MetaTagsProps> = ({ title, description }) => {
  useEffect(() => {
    if (title.includes('Rucking Calorie Calculator')) {
        document.title = title;
    } else {
        document.title = `${title} | Rucking Calorie Calculator`;
    }

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
  }, [title, description]);

  return null; // This component does not render anything to the DOM
};