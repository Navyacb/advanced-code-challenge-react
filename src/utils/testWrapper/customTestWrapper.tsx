import React from 'react';
import { StatistaContextData } from '../../state management/StatistaContextData';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

export const queryClient = new QueryClient()

export const mockStatistsData = [
  {
    "identifier": 1200213,
    "title": "India: major investing countries 2019",
    "link": "https://de.statista.com/statistics/1200213/india-major-investing-countries/",
    "subject": "Leading countries for foreign direct investment into India from financial year 2013 to 2019 (in million U.S. dollars)",
    "description": "In financial year 2019, the highest amount of foreign direct investments (FDI) to India came from Singapore amounting around 16.3 billion U.S. dollars. Following Singapore, Mauritius and the Netherlands are the second and third largest foreign investors in India. These three countries are known to have Double Taxation Avoidance Agreements (DTAA) that allow them to be popular transit countries for foreign investments.",
    "date": "2021-01-29",
    "premium": 1,
    "image_url": "https://de.statista.com/graphic/5/1200213/india-major-investing-countries.jpg",
    "teaser_image_urls": [
      {
        "width": 754,
        "src": "https://de.statista.com/graphic/teaser/754/5/1200213/india-major-investing-countries.jpg"
      },
      {
        "width": 355,
        "src": "https://de.statista.com/graphic/teaser/355/5/1200213/india-major-investing-countries.jpg"
      },
      {
        "width": 100,
        "src": "https://cdn.statcdn.com/Statistic/1200000/1200213-blank-100.png"
      }
    ]
}
]

export const AllProviders = ({ children }: { children: React.ReactNode }) => {
  
  
  
  return (
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <StatistaContextData.Provider value={{
                statistaData : mockStatistsData,
                searchResult : [],
                searchDispatch : ()=>{},
                favoritesData : [],
                favDispatch : ()=>{},
            }}>
          {children}
    </StatistaContextData.Provider>
    </QueryClientProvider>
    </BrowserRouter>
  )
}

