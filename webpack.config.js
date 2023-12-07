import { fileURLToPath } from 'url';
import path from 'path';
import * as glob from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function getEntries(pattern) {
    const entries = {};
    const files = glob.sync(pattern);
  
    files.forEach(file => {
      const entryName = path.parse(file).name;
      entries[entryName] = file;
    });
  
    return entries;
  }

export default {
    entry: getEntries('src/views/**/*.'),
  output: {
    filename: '[name].jsx',
    path: path.resolve(__dirname, 'dist/views'),
  },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
};
