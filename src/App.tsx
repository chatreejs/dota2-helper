import { App as AntApp, ConfigProvider } from 'antd';

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
        <h1 style={{ fontFamily: 'OPTIwtcGoudy-Medium' }}>
          {'Dota2'.toLocaleUpperCase()}
        </h1>
      </AntApp>
    </ConfigProvider>
  );
};

export default App;
