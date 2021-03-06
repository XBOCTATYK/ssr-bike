import 'babel-polyfill';
import { createApp } from './react-app';
import { SSRLink } from '../components/hooks/use-ssr-request';

SSRLink(window.__data__)
createApp();
