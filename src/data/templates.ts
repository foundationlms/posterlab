import { PosterTemplate } from '../types/poster';

// Standard sizes in pixels at 300 DPI
const sizes = {
  // International sizes (mm converted to pixels at 300 DPI)
  A0: { width: 9933, height: 14043 }, // 841 × 1189 mm
  A1: { width: 7016, height: 9933 },  // 594 × 841 mm
  A2: { width: 4961, height: 7016 },  // 420 × 594 mm
  
  // US sizes (inches converted to pixels at 300 DPI)
  US_48x36: { width: 14400, height: 10800 }, // 48" × 36"
  US_36x48: { width: 10800, height: 14400 }, // 36" × 48"
};

export const templates: PosterTemplate[] = [
  // US Templates
  {
    id: 'us-48x36',
    name: '48" × 36" Landscape',
    type: 'us',
    width: sizes.US_48x36.width,
    height: sizes.US_48x36.height,
    orientation: 'landscape',
    sections: [
      {
        id: 'header',
        name: 'Title & Authors',
        type: 'header',
        area: '1/1/3/13',
        required: true,
        placeholder: 'Add title and authors'
      },
      {
        id: 'abstract',
        name: 'Abstract',
        area: '3/1/4/13',
        type: 'text',
        placeholder: 'Add abstract'
      },
      {
        id: 'introduction',
        name: 'Introduction',
        area: '4/1/6/5',
        type: 'text',
        placeholder: 'Add introduction'
      },
      {
        id: 'methods',
        name: 'Methods',
        area: '4/5/6/9',
        type: 'methods',
        placeholder: 'Add methods'
      },
      {
        id: 'results',
        name: 'Results',
        area: '4/9/6/13',
        type: 'results',
        placeholder: 'Add results'
      },
      {
        id: 'discussion',
        name: 'Discussion',
        area: '6/1/8/7',
        type: 'text',
        placeholder: 'Add discussion'
      },
      {
        id: 'references',
        name: 'References',
        area: '6/7/8/13',
        type: 'references',
        placeholder: 'Add references'
      }
    ]
  },
  {
    id: 'us-36x48',
    name: '36" × 48" Portrait',
    type: 'us',
    width: sizes.US_36x48.width,
    height: sizes.US_36x48.height,
    orientation: 'portrait',
    sections: [
      {
        id: 'header',
        name: 'Title & Authors',
        type: 'header',
        area: '1/1/3/13',
        required: true,
        placeholder: 'Add title and authors'
      },
      {
        id: 'abstract',
        name: 'Abstract',
        area: '3/2/4/12',
        type: 'text',
        placeholder: 'Add abstract'
      },
      {
        id: 'introduction',
        name: 'Introduction',
        area: '4/1/6/7',
        type: 'text',
        placeholder: 'Add introduction'
      },
      {
        id: 'methods',
        name: 'Methods',
        area: '4/7/6/13',
        type: 'methods',
        placeholder: 'Add methods'
      },
      {
        id: 'results',
        name: 'Results',
        area: '6/1/8/13',
        type: 'results',
        placeholder: 'Add results'
      },
      {
        id: 'discussion',
        name: 'Discussion',
        area: '8/1/10/13',
        type: 'text',
        placeholder: 'Add discussion'
      },
      {
        id: 'references',
        name: 'References',
        area: '10/1/11/13',
        type: 'references',
        placeholder: 'Add references'
      }
    ]
  },

  // International Templates
  {
    id: 'a0-portrait',
    name: 'A0 Portrait',
    type: 'international',
    width: sizes.A0.width,
    height: sizes.A0.height,
    orientation: 'portrait',
    sections: [
      {
        id: 'header',
        name: 'Title & Authors',
        type: 'header',
        area: '1/1/3/13',
        required: true,
        placeholder: 'Add title and authors'
      },
      {
        id: 'abstract',
        name: 'Abstract',
        area: '3/2/4/12',
        type: 'text',
        placeholder: 'Add abstract'
      },
      {
        id: 'introduction',
        name: 'Introduction',
        area: '4/1/6/7',
        type: 'text',
        placeholder: 'Add introduction'
      },
      {
        id: 'methods',
        name: 'Methods',
        area: '4/7/6/13',
        type: 'methods',
        placeholder: 'Add methods'
      },
      {
        id: 'results',
        name: 'Results',
        area: '6/1/8/13',
        type: 'results',
        placeholder: 'Add results'
      },
      {
        id: 'discussion',
        name: 'Discussion',
        area: '8/1/10/13',
        type: 'text',
        placeholder: 'Add discussion'
      },
      {
        id: 'references',
        name: 'References',
        area: '10/1/11/13',
        type: 'references',
        placeholder: 'Add references'
      }
    ]
  },
  {
    id: 'a0-landscape',
    name: 'A0 Landscape',
    type: 'international',
    width: sizes.A0.height,
    height: sizes.A0.width,
    orientation: 'landscape',
    sections: [
      {
        id: 'header',
        name: 'Title & Authors',
        type: 'header',
        area: '1/1/3/13',
        required: true,
        placeholder: 'Add title and authors'
      },
      {
        id: 'abstract',
        name: 'Abstract',
        area: '3/1/4/13',
        type: 'text',
        placeholder: 'Add abstract'
      },
      {
        id: 'introduction',
        name: 'Introduction',
        area: '4/1/6/5',
        type: 'text',
        placeholder: 'Add introduction'
      },
      {
        id: 'methods',
        name: 'Methods',
        area: '4/5/6/9',
        type: 'methods',
        placeholder: 'Add methods'
      },
      {
        id: 'results',
        name: 'Results',
        area: '4/9/6/13',
        type: 'results',
        placeholder: 'Add results'
      },
      {
        id: 'discussion',
        name: 'Discussion',
        area: '6/1/8/7',
        type: 'text',
        placeholder: 'Add discussion'
      },
      {
        id: 'references',
        name: 'References',
        area: '6/7/8/13',
        type: 'references',
        placeholder: 'Add references'
      }
    ]
  },
  {
    id: 'a1-portrait',
    name: 'A1 Portrait',
    type: 'international',
    width: sizes.A1.width,
    height: sizes.A1.height,
    orientation: 'portrait',
    sections: [
      {
        id: 'header',
        name: 'Title & Authors',
        type: 'header',
        area: '1/1/3/13',
        required: true,
        placeholder: 'Add title and authors'
      },
      {
        id: 'abstract',
        name: 'Abstract',
        area: '3/2/4/12',
        type: 'text',
        placeholder: 'Add abstract'
      },
      {
        id: 'introduction',
        name: 'Introduction',
        area: '4/1/6/7',
        type: 'text',
        placeholder: 'Add introduction'
      },
      {
        id: 'methods',
        name: 'Methods',
        area: '4/7/6/13',
        type: 'methods',
        placeholder: 'Add methods'
      },
      {
        id: 'results',
        name: 'Results',
        area: '6/1/8/13',
        type: 'results',
        placeholder: 'Add results'
      },
      {
        id: 'discussion',
        name: 'Discussion',
        area: '8/1/10/13',
        type: 'text',
        placeholder: 'Add discussion'
      },
      {
        id: 'references',
        name: 'References',
        area: '10/1/11/13',
        type: 'references',
        placeholder: 'Add references'
      }
    ]
  },
  {
    id: 'a1-landscape',
    name: 'A1 Landscape',
    type: 'international',
    width: sizes.A1.height,
    height: sizes.A1.width,
    orientation: 'landscape',
    sections: [
      {
        id: 'header',
        name: 'Title & Authors',
        type: 'header',
        area: '1/1/3/13',
        required: true,
        placeholder: 'Add title and authors'
      },
      {
        id: 'abstract',
        name: 'Abstract',
        area: '3/1/4/13',
        type: 'text',
        placeholder: 'Add abstract'
      },
      {
        id: 'introduction',
        name: 'Introduction',
        area: '4/1/6/5',
        type: 'text',
        placeholder: 'Add introduction'
      },
      {
        id: 'methods',
        name: 'Methods',
        area: '4/5/6/9',
        type: 'methods',
        placeholder: 'Add methods'
      },
      {
        id: 'results',
        name: 'Results',
        area: '4/9/6/13',
        type: 'results',
        placeholder: 'Add results'
      },
      {
        id: 'discussion',
        name: 'Discussion',
        area: '6/1/8/7',
        type: 'text',
        placeholder: 'Add discussion'
      },
      {
        id: 'references',
        name: 'References',
        area: '6/7/8/13',
        type: 'references',
        placeholder: 'Add references'
      }
    ]
  }
];