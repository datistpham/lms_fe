import { gql } from "@apollo/client" 

const CREATECLASS = gql`
    mutation createClass($id_class: String!, $class_name: String!, $description: String!, $perform: Boolean!, $invite: Boolean!, $own_id: String!, $cover_image: String) {
        createClass(id_class: $id_class, class_name: $class_name, description: $description, perform: $perform, invite: $invite, own_id: $own_id, cover_image: $cover_image) {
            id_class,
            class_name,
            description,
            perform,
            invite, 
            own_id,
            code_invite,
            cover_image
        }
    }
`

export default CREATECLASS