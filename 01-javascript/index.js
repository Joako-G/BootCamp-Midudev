import './utils/filters.js'
import './utils/apply-job.js'
import { Jobs } from './components/Jobs.js'
import { renderButtonPagination } from './components/Button.js'
import { jobs } from '../utils/fetch-data.js'
import { pagination } from './utils/pagination.js'


const RESULTS_PER_PAGE = 3
let currentPage = 1

Jobs(jobs, currentPage, RESULTS_PER_PAGE)
renderButtonPagination(jobs, currentPage, RESULTS_PER_PAGE)
pagination(jobs, currentPage, RESULTS_PER_PAGE)
