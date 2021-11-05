import { Link } from "react-router-dom"
import { Icon, Segment, Header, Button } from "semantic-ui-react"

export default function NotFound(){
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name='search' />
                 ooops - we have looked everywhere and could not find this.
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/activities' primary>
                    Return to activities page
                </Button>
            </Segment.Inline>
        </Segment>
    )
}