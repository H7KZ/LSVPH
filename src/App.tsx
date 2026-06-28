import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Timetable from './pages/Timetable'
import Lunch from './pages/Lunch'
import Subjects from './pages/Subjects'
import Presentation from './pages/Presentation'
import NotFound from './pages/NotFound'

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route path="/" element={<Home />} />
					<Route path="/timetable" element={<Timetable />} />
					<Route path="/lunch" element={<Lunch />} />
					<Route path="/subjects" element={<Subjects />} />
					<Route path="*" element={<NotFound />} />
				</Route>
				<Route path="/subject/:slug" element={<Presentation />} />
			</Routes>
		</BrowserRouter>
	)
}
