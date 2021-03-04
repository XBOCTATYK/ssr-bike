import 'babel-polyfill';
import { createApp } from './react-app';
import { SSRLink } from '../components/hooks/useSsrRequest';

SSRLink(window.__data__)
createApp();
