import { FileText, Monitor, Network, Shield, Settings } from 'lucide-react';

function UserManual() {
  const sections = [
    {
      title: 'Control Panel Overview',
      icon: <Monitor className="w-6 h-6" />,
      content: `## Main Interface
- Dashboard overview
- Workstation management
- User settings
- System status

## Navigation
- Menu structure
- Quick access tools
- Status indicators
- Help resources`
    },
    {
      title: 'Workstation Configuration',
      icon: <Settings className="w-6 h-6" />,
      content: `## Display Setup
- Monitor configuration
- Resolution settings
- Display arrangement
- Color calibration

## Input Devices
- Keyboard mapping
- Mouse settings
- Game controller setup
- Audio devices`
    },
    {
      title: 'Network Settings',
      icon: <Network className="w-6 h-6" />,
      content: `## Network Configuration
- IP settings
- Port configuration
- Firewall rules
- Bandwidth management

## Remote Access
- Remote desktop setup
- Access permissions
- Security protocols
- Connection management`
    },
    {
      title: 'Security Features',
      icon: <Shield className="w-6 h-6" />,
      content: `## User Authentication
- Login methods
- Password policies
- 2FA setup
- Session management

## Access Control
- User permissions
- Resource limits
- Application restrictions
- Security policies`
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <FileText className="w-8 h-8" />
        <h1 className="text-4xl font-bold">User Manual</h1>
      </div>

      <div className="grid gap-8">
        {sections.map((section, index) => (
          <section key={index} className="bg-base-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              {section.icon}
              <h2 className="text-2xl font-bold">{section.title}</h2>
            </div>
            <div className="max-w-none">
              <div className="whitespace-pre-wrap">{section.content}</div>
            </div>
          </section>
        ))}
      </div>

      <div className="mt-8 p-4 bg-base-200 rounded-lg">
        <h3 className="text-xl font-bold mb-2">Additional Resources</h3>
        <ul className="list-disc list-inside">
          <li>Video tutorials for visual guides</li>
          <li>PDF documentation for offline reference</li>
          <li>Community forums for user discussions</li>
          <li>Technical support for assistance</li>
        </ul>
      </div>
    </div>
  );
}

export default UserManual; 