const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  mode,
  devtool: mode === 'development' ? 'source-map' : 'hidden-source-map',
  entry: /* './src/index.tsx' */ {
    app: path.join(__dirname, 'src', 'index.tsx'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: '[name].js',      // 컴파일 될 파일이름. ( [name]은 entry 키의 app을 뜻함 )
    path: path.resolve(__dirname, 'dist'),  // 컴파일된 파일이 저장될 폴더
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/public/index.html',
      templateParameters: {
        // HTML 파일에서 사용될 변수들
        env: process.env.NODE_ENV === 'production' ? '' : '[DEV]',
      },
      // 번들링된 HTML 파일에서 공백이 제거되고 주석이 삭제됨
      minify:
        process.env.NODE_ENV === 'production'
          ? {
              collapseWhitespace: true,
              removeComments: true,
            }
          : false,
      hash: true, // 정적 파일을 불러올 때 쿼리문자열에 웹팩 해쉬값을 추가.
    }),
    new CleanWebpackPlugin(),
  ],

  // > webpack-dev-server
  devServer: {
    contentBase: path.resolve('./public'),  // 서버에 콘텐츠를 제공할 위치를 알려줌 (정적 파일들)
    hot: true,  // hot reload 기능 활성 (전체 Reload 없이 애플리케이션 실행되는 동안 모듈을 교환, 추가 또는 제거)
    host: 'localhost',    // 개발환경에서 도메인을 맞추어야 하는 상황에서 사용
    port: 3000,           // 개발 서버 포트 번호 설정
    historyApiFallback: true, // 히스토리 API를 사용하는 SPA 개발시 설정. 404가 발생하면 index.html로 리다이렉트
    writeToDisk: true, // true시 devServer로 생성되는 컴파일된 파일을 저장함. 저장은 설정한 output.path 디렉토리에 기록 (기본값 false)

    /* 
      > 추가 옵션 끄적 끄적 👀
        - publicPath (기본값 '/')
          브라우저를 통해 접근하는 경로
        - overlay
          빌드시 에러나 경고를 브라우져 화면에 표시
        - stats
          메시지 수준을 정할수 있다. 
          'none', 'errors-only', 'minimal', 'normal', 'verbose'로 
          메세지 수준을 조절
        - lazy & filename
          1) lazy
            lazy모드가 활성화가 되면 dev-server는 요청될 때만 번들을 컴파일. 
            이는 웹 팩이 파일 변경 사항을 감시하지 않음을 의미. 
            게으른 모드라고도 불러짐 
          2) filename
            devServer 설정하는 부분에서의 filename 옵션은 lazy 모드에서 사용하면 컴파일을 줄일수 있음. 
            lazy 모드에서 없이 사용하면 효과 없음

          예시)
            lazy: true,
            filename: '[name].js',
    */
  }
};
