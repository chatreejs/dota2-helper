import { App as AntApp, ConfigProvider } from 'antd';
import styled from 'styled-components';

import { Footer } from '@components';
import { AppRoutes } from '@config';

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 0.5rem;
  width: 100%;
  max-width: 920px;
`;

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Outfit',
          fontSize: 14,
          fontWeightStrong: 700,
        },
      }}
    >
      <AntApp>
        <MainWrapper>
          <AppRoutes />
          <Footer />
        </MainWrapper>
      </AntApp>
    </ConfigProvider>
  );
};

export default App;
