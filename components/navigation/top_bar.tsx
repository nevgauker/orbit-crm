import TeamSwitcher from './team_switcher'
export default function TopBar() {
  return (
    <div className=' bg-gray-100 h-9 flex space-x-2'>
      <div className='ml-2 mt-2'>
        <TeamSwitcher />
      </div>
    </div>
  )
}

