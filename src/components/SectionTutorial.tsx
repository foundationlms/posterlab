import React from 'react';
import { HelpCircle, Layout, Image, Table, FileText, AlertTriangle, BookOpen, BarChart } from 'lucide-react';
import { PosterSection } from '../types/poster';

interface SectionTutorialProps {
  section: PosterSection;
}

const SectionTutorial: React.FC<SectionTutorialProps> = ({ section }) => {
  const getTutorialContent = () => {
    switch (section.type) {
      case 'text':
        return {
          title: 'Writing Academic Text',
          tips: [
            'Use clear, academic language suitable for your field',
            'Structure content with clear topic sentences',
            'Include key citations to support main points',
            'Recommended: 3-4 short paragraphs or 5-7 bullet points'
          ],
          examples: [
            'Background: State research gap and objectives',
            'Methods summary: Key experimental approaches',
            'Results highlight: Primary findings and p-values',
            'Impact statement: Research significance'
          ],
          warning: 'Text automatically scales to maintain readability'
        };
      case 'figure':
        return {
          title: 'Research Figures & Data Visualization',
          tips: [
            'Use publication-quality figures (300 DPI minimum)',
            'Include clear axis labels and units',
            'Add concise figure legends',
            'Highlight statistical significance'
          ],
          examples: [
            'Experimental data plots',
            'Statistical analyses',
            'Microscopy images',
            'Mechanism diagrams'
          ],
          warning: 'Figures will auto-resize while preserving aspect ratio and detail'
        };
      case 'table':
        return {
          title: 'Data Tables',
          tips: [
            'Present only essential data points',
            'Include standard deviations or error ranges',
            'Use consistent decimal places',
            'Highlight significant results (e.g., with asterisks)'
          ],
          examples: [
            'Statistical summaries',
            'Experimental conditions',
            'Sample characteristics',
            'Comparative analyses'
          ],
          warning: 'Tables automatically adjust to maintain column alignment'
        };
      case 'methods':
        return {
          title: 'Methods & Protocols',
          tips: [
            'Focus on novel or modified techniques',
            'Include key experimental parameters',
            'State statistical methods used',
            'Reference standard protocols instead of detailed steps'
          ],
          examples: [
            'Sample preparation: "Cell lines were cultured in DMEM (37°C, 5% CO2)"',
            'Analysis: "Data analyzed using two-way ANOVA (GraphPad Prism 9.0)"',
            'Controls: "Wild-type strain served as control (n=6)"'
          ],
          warning: 'Include essential details while maintaining brevity'
        };
      case 'results':
        return {
          title: 'Research Results',
          tips: [
            'Present key findings with statistical significance',
            'Use precise numerical values with uncertainties',
            'Link results to research objectives',
            'Support claims with data visualization'
          ],
          examples: [
            'Primary outcome: "Treatment reduced tumor size by 65±5% (p<0.001)"',
            'Correlation: "Strong positive correlation observed (r=0.89, p<0.01)"',
            'Comparison: "2.5-fold increase compared to control group"'
          ],
          warning: 'Focus on key findings that support your conclusions'
        };
      case 'references':
        return {
          title: 'Academic Citations',
          tips: [
            'Cite seminal papers in your field',
            'Include recent relevant publications',
            'Follow conference citation format',
            'Prioritize peer-reviewed sources'
          ],
          examples: [
            'Method validation papers',
            'Key background literature',
            'Recent related findings',
            'Meta-analyses or reviews'
          ],
          warning: 'Select most relevant citations (typically 5-10 key references)'
        };
      default:
        return {
          title: 'Research Content Guidelines',
          tips: [
            'Maintain academic tone and precision',
            'Support claims with data or citations',
            'Use field-specific terminology appropriately',
            'Follow logical flow of information'
          ],
          examples: [
            'Clear research objective',
            'Methodology summary',
            'Key findings',
            'Research impact'
          ],
          warning: 'Content automatically adjusts to maintain professional presentation'
        };
    }
  };

  const content = getTutorialContent();

  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-4">
      <div className="flex items-center space-x-2 mb-3">
        <BookOpen className="h-5 w-5 text-indigo-500" />
        <h3 className="font-medium text-gray-900">{content.title}</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Best Practices</h4>
          <ul className="space-y-2">
            {content.tips.map((tip, index) => (
              <li key={index} className="flex items-start text-sm text-gray-600">
                <span className="flex-shrink-0 w-4 h-4 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs mr-2 mt-0.5">
                  {index + 1}
                </span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Examples</h4>
          <ul className="space-y-2">
            {content.examples.map((example, index) => (
              <li key={index} className="flex items-start text-sm text-gray-600">
                <span className="flex-shrink-0 w-4 h-4 rounded bg-green-100 text-green-600 flex items-center justify-center text-xs mr-2 mt-0.5">
                  <BarChart className="h-3 w-3" />
                </span>
                {example}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {content.warning && (
        <div className="flex items-start space-x-2 text-sm text-amber-600 bg-amber-50 p-3 rounded-md">
          <AlertTriangle className="h-5 w-5 flex-shrink-0" />
          <p>{content.warning}</p>
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500">
        Note: All content automatically adjusts to maintain professional presentation standards while preserving readability.
      </div>
    </div>
  );
};

export default SectionTutorial;