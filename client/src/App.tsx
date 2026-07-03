import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Lunch from './pages/Lunch'
import NotFound from './pages/NotFound'
import Presentation from './pages/Presentation'
import Presentations from './pages/Presentations'
import Timetable from './pages/Timetable'

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route path="/" element={<Home />} />
					<Route path="/timetable" element={<Timetable />} />
					<Route path="/lunch" element={<Lunch />} />
					<Route path="/presentations" element={<Presentations />} />
					<Route path="*" element={<NotFound />} />
				</Route>
				<Route path="/presentation/:slug" element={<Presentation />} />
			</Routes>
		</BrowserRouter>
	)
}
